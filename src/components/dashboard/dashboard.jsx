import React, { useState, useEffect, useMemo } from "react";
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
  const [receipts, setReceipts] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeMonth, setActiveMonth] = useState(null);
  const [cookieColors, setCookieColors] = useState({});
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showAllYear, setShowAllYear] = useState(false);

  const latestOrders = useMemo(() => {
    return [...filteredOrders]
      .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
      .slice(0, 5);
  }, [filteredOrders]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("timestamp", "asc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    };

    const fetchReceipts = async () => {
      const receiptsRef = collection(db, "receipts");
      const snapshot = await getDocs(receiptsRef);
      const receiptsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReceipts(receiptsData);
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
    fetchReceipts();
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
    filteredOrders.forEach(({ timestamp, cookieSelections }) => {
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

    return Object.keys(salesByMonth).map((month) => ({
      name: month,
      sales: salesByMonth[month],
    }));
  };

  const processCookieSales = (month) => {
    const cookieSales = {};
    const relevantOrders = month
      ? filteredOrders.filter(({ timestamp }) => {
          const date = new Date(timestamp.seconds * 1000);
          return `${date.getFullYear()}-${date.getMonth() + 1}` === month;
        })
      : filteredOrders;

    relevantOrders.forEach(({ cookieSelections }) => {
      cookieSelections.forEach(({ cookie, numCookies }) => {
        const cookiesSold = Number(numCookies);
        if (!isNaN(cookiesSold)) {
          cookieSales[cookie] = (cookieSales[cookie] || 0) + cookiesSold;
        }
      });
    });

    return Object.keys(cookieSales).map((cookie, index) => {
      if (!cookieColors[cookie]) {
        const newColor = colorPool[index % colorPool.length];
        setCookieColors((prevColors) => ({ ...prevColors, [cookie]: newColor }));
      }
      return { name: cookie, value: cookieSales[cookie] };
    });
  };

  const getTopGirlScouts = () => {
    const salesMap = {};
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
  
    receipts.forEach(({ girlName, parentName, numberOfBoxesSold, timestamp }) => {
      if (!timestamp || !timestamp.seconds) return;
  
      const date = new Date(timestamp.seconds * 1000);
      const receiptMonth = date.getMonth() + 1;
      const receiptYear = date.getFullYear();
  
      const matchesFilter = showAllYear
        ? receiptYear === currentYear
        : receiptYear === currentYear && receiptMonth === currentMonth;
  
      if (matchesFilter) {
        const identifier = `${girlName || "Unknown"} (${parentName || "Unknown"})`;
        salesMap[identifier] = (salesMap[identifier] || 0) + Number(numberOfBoxesSold || 0);
      }
    });
  
    return Object.entries(salesMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([identifier, total]) => {
        const girlName = identifier.split(" (")[0]; 
        return { girlName, total };
      });
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredOrders(orders);
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"dashboard"} />
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Dashboard"} />
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          {/* Cookies Sold Graph */}
          <div className="bg-white p-6 rounded-md shadow-md mb-8">
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

            {filteredOrders.length === 0 ? (
              <div className="text-center text-xl text-gray-600 mt-8">
                <p>No orders in this date range</p>
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Cookie Sales by Type</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={processSalesData()}
                      onClick={(e) => {
                        if (e?.activePayload?.length) {
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
                      <Pie
                        data={processCookieSales(activeMonth)}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                      >
                        {processCookieSales(activeMonth).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={cookieColors[entry.name] || colorPool[index % colorPool.length]}
                          />
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
          <div className="flex flex-col lg:flex-row gap-8 mb-8">

            {/* Last Orders */}
            <div className="bg-white p-6 rounded-md shadow-md w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Last Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-200 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Girl's Name</th>
                      <th className="px-4 py-2">Parent's Name</th>
                      <th className="px-4 py-2">Cookies Ordered</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {latestOrders.map((order) => {
                      const orderDate = new Date(order.timestamp.seconds * 1000).toLocaleString();
                      const girl = order.girlName || "Unknown";
                      const parent = order.parentName || "Unknown";
                      const totalCookies = order.cookieSelections?.reduce(
                        (sum, sel) => sum + Number(sel.numCookies || 0),
                        0
                      );

                      return (
                        <tr key={order.id} className="border-t">
                          <td className="px-4 py-2">{orderDate}</td>
                          <td className="px-4 py-2">{girl}</td>
                          <td className="px-4 py-2">{parent}</td>
                          <td className="px-4 py-2">{totalCookies}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Girl Scouts */}
            <div className="bg-white p-6 rounded-md shadow-md w-full lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Top Girl Scouts</h3>
                <button
                  onClick={() => setShowAllYear((prev) => !prev)}
                  className="text-sm text-blue-600 underline hover:text-blue-800 transition"
                >
                  {showAllYear ? "Show This Month" : "Show All Year"}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-200 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2">Girl's Name</th>
                      <th className="px-4 py-2">Cookies Sold</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {getTopGirlScouts().map(({ girlName, total }) => (
                      <tr key={girlName} className="border-t">
                        <td className="px-4 py-2">{girlName}</td>
                        <td className="px-4 py-2">{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
