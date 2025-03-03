import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Header from "../header";
import SideBar from "../sidebar/sidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PieChart, Pie, Legend } from "recharts";

// Define a color pool with enough unique colors
const colorPool = [
  "#FFB6C1", 
  "#FFD700", 
  "#87CEEB", 
  "#FF69B4",
  "#98FB98", 
  "#FFA07A", 
  "#8A2BE2", 
  "#FF6347", 
  "#00FA9A", 
  "#D2691E",
  "#9ACD32", 
  "#FF4500", 
];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeMonth, setActiveMonth] = useState(null);
  const [cookieColors, setCookieColors] = useState({}); // Object to store colors for each cookie type

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

      // Assign colors to cookie types, cycling through the color pool
      cookieData.forEach((cookie, index) => {
        colors[cookie] = colorPool[index % colorPool.length]; 
      });

      setCookieColors(colors); // Set the color mapping for cookie types
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
      setFilteredOrders(orders); // If no date is set, show all orders
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
    return Object.keys(cookieSales).map((cookie) => ({ name: cookie, value: cookieSales[cookie] }));
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar />
      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
            <div className="flex justify-center gap-4 mb-4">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-4 py-2 border rounded-md" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-4 py-2 border rounded-md" />
            </div>

            {/* Reset Pie Chart Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setActiveMonth(null)} // Reset the active month to null
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
              >
                Reset Pie Chart
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Cookie Sales by Type</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={processSalesData()}
                    onClick={(e) => {
                      if (e && e.activePayload && e.activePayload.length > 0) {
                        const selectedMonth = e.activePayload[0].payload.name;
                        setActiveMonth(selectedMonth);
                      } else {
                        setActiveMonth(null); // if clicked outside, reset to total sales
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
                        <Cell key={`cell-${index}`} fill={cookieColors[entry.name] || "#8884d8"} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
