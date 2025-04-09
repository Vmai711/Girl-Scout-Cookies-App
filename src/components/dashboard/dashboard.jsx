import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Header from "../header";
import SideBar from "../sidebar/sidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PieChart, Pie, Legend } from "recharts";

const colorPool = [
  "#FFB6C1", "#FFD700", "#87CEEB", "#FF69B4",
  "#98FB98", "#FFA07A", "#8A2BE2", "#FF6347",
  "#00FA9A", "#D2691E", "#9ACD32", "#FF4500"
];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeMonth, setActiveMonth] = useState(null);
  const [cookieColors, setCookieColors] = useState({});
  const [showDateMenu, setShowDateMenu] = useState(false); // Menu toggle state

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("timestamp", "asc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    };

    const fetchCookieTypes = async () => {
      const cookieRef = collection(db, "cookieTypes");
      const snapshot = await getDocs(cookieRef);
      const cookieData = snapshot.docs.map((doc) => doc.data().Types).flat();

      const colors = {};
      cookieData.forEach((cookie, index) => {
        colors[cookie] = colorPool[index % colorPool.length]; 
      });

      setCookieColors(colors); 
    };

    fetchOrders();
    fetchCookieTypes();
  }, []); 

  useEffect(() => {
    if (startDate || endDate) {
      const start = new Date(startDate || "1970-01-01");
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate || new Date().toISOString().split("T")[0]);
      end.setHours(23, 59, 59, 999);

      const filtered = orders.filter(({ timestamp }) => {
        const orderDate = new Date(timestamp.seconds * 1000);
        return orderDate >= start && orderDate <= end;
      });

      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [startDate, endDate, orders]);

  const processSalesData = () => {
    const salesByMonth = {};
    filteredOrders.forEach(({ timestamp, numCookies, cookieSelections }) => {
      const date = new Date(timestamp.seconds * 1000);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
      let cookiesSold = 0;

      cookieSelections.forEach(({ numCookies }) => {
        cookiesSold += Number(numCookies);
      });

      if (!isNaN(cookiesSold)) {
        salesByMonth[month] = (salesByMonth[month] || 0) + cookiesSold;
      }
    });

    if (Object.keys(salesByMonth).length === 0) {
      return [];  // Return an empty array if no data exists for the filtered orders
    }

    return Object.keys(salesByMonth).map((month) => ({ name: month, sales: salesByMonth[month] }));
  };

  const processCookieSales = (month) => {
    const cookieSales = {};
    if (month === null) {
      filteredOrders.forEach(({ cookieSelections }) => {
        cookieSelections.forEach(({ cookie, numCookies }) => {
          const cookiesSold = Number(numCookies);
          if (!isNaN(cookiesSold)) {
            cookieSales[cookie] = (cookieSales[cookie] || 0) + cookiesSold;
          }
        });
      });
    } else {
      filteredOrders
        .filter(({ timestamp }) => {
          const date = new Date(timestamp.seconds * 1000);
          return `${date.getFullYear()}-${date.getMonth() + 1}` === month;
        })
        .forEach(({ cookieSelections }) => {
          cookieSelections.forEach(({ cookie, numCookies }) => {
            const cookiesSold = Number(numCookies);
            if (!isNaN(cookiesSold)) {
              cookieSales[cookie] = (cookieSales[cookie] || 0) + cookiesSold;
            }
          });
        });
    }

    const salesArray = Object.keys(cookieSales).map((cookie, index) => {
      if (!cookieColors[cookie]) {
        const newColor = colorPool[index % colorPool.length];
        setCookieColors((prevColors) => ({ ...prevColors, [cookie]: newColor }));
      }
      return { name: cookie, value: cookieSales[cookie] };
    });

    return salesArray;
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredOrders(orders);
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar />
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Dashboard"}/>
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md">
            {/* Header with date range and options */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold">Cookies Sold</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {startDate || endDate
                    ? `From ${startDate || "beginning"} to ${endDate || "now"}`
                    : "Showing all sales"}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowDateMenu(!showDateMenu)}
                  className="text-gray-600 hover:text-gray-900 text-2xl"
                >
                  &#8942;
                </button>
                {showDateMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-10">
                    <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full mb-3 px-3 py-2 border rounded"
                    />
                    <label className="block text-sm text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <button
                      onClick={handleClearFilters}
                      className="w-full mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Display message if no data */}
            {filteredOrders.length === 0 && (
              <div className="text-center text-xl text-gray-600 mt-8">
                <p>No orders in this date range</p>
              </div>
            )}

            {/* Render charts if there is data */}
            {filteredOrders.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Cookie Sales by Type</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={processSalesData()}
                      onClick={(e) => {
                        if (e && e.activePayload && e.activePayload.length > 0) {
                          setActiveMonth(e.activePayload[0].payload.name);
                        } else {
                          setActiveMonth(null);
                        }
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={processCookieSales(activeMonth)} dataKey="value" nameKey="name" outerRadius={100}>
                        {processCookieSales(activeMonth).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={cookieColors[entry.name] || colorPool[index % colorPool.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>

          {/* Gray Background Divider between boxes */}
          <div className="bg-gray-200 my-8 h-px"></div>

          {/* Boxes for Last Orders and Top Girl Scouts (Side by Side) */}
          <div className="flex space-x-6">
            {/* Last Orders Box */}
            <div className="bg-white p-6 rounded-md shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-4">Last Orders</h3>
              <div className="space-y-4">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="text-sm text-gray-600">Order {idx + 1} - John Doe</p>
                    <p className="text-sm text-gray-500">Details...</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Girl Scouts Box */}
            <div className="bg-white p-6 rounded-md shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-4">Top Girl Scouts</h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">John Doe</p>
                <p className="text-sm text-gray-600">John Doe</p>
                <p className="text-sm text-gray-600">John Doe</p>
                <p className="text-sm text-gray-600">John Doe</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
