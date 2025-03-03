import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Header from "../header";
import SideBar from "../sidebar/sidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PieChart, Pie, Legend } from "recharts";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeMonth, setActiveMonth] = useState(null); // to store the selected month on click

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("timestamp", "asc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filtered = orders.filter(({ timestamp }) => {
        const orderDate = new Date(timestamp.seconds * 1000);
        return orderDate >= start && orderDate <= end;
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [startDate, endDate, orders]);

  const filterLastDays = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const processSalesData = () => {
    const salesByMonth = {};
    filteredOrders.forEach(({ timestamp, numCookies }) => {
      const date = new Date(timestamp.seconds * 1000);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const cookiesSold = Number(numCookies);
      if (!isNaN(cookiesSold)) {
        salesByMonth[month] = (salesByMonth[month] || 0) + cookiesSold;
      }
    });
    return Object.keys(salesByMonth).map((month) => ({ name: month, sales: salesByMonth[month] }));
  };

  const processCookieSales = (month) => {
    const cookieSales = {};
    if (month === null) {
      // Calculate total sales if no month is selected
      filteredOrders.forEach(({ cookieSelection, numCookies }) => {
        const cookiesSold = Number(numCookies);
        if (!isNaN(cookiesSold)) {
          cookieSales[cookieSelection] = (cookieSales[cookieSelection] || 0) + cookiesSold;
        }
      });
    } else {
      // Calculate sales for the selected month
      filteredOrders
        .filter(({ timestamp }) => {
          const date = new Date(timestamp.seconds * 1000);
          return `${date.getFullYear()}-${date.getMonth() + 1}` === month;
        })
        .forEach(({ cookieSelection, numCookies }) => {
          const cookiesSold = Number(numCookies);
          if (!isNaN(cookiesSold)) {
            cookieSales[cookieSelection] = (cookieSales[cookieSelection] || 0) + cookiesSold;
          }
        });
    }
    return Object.keys(cookieSales).map((cookie) => ({ name: cookie, value: cookieSales[cookie] }));
  };

  // Assigning specific colors to each cookie type
  const COOKIE_COLORS = {
    "Adventurefuls": "#FFB6C1",
    "Toast-Yays": "#FFD700",
    "Lemonades": "#87CEEB",
    "Trefoil": "#FF69B4",
    "Thin Mints": "#98FB98",
    "Peanut Butter Patties": "#FFA07A",
    "Caramel deLites": "#8A2BE2",
    "Peanut Butter Sandwich": "#FF6347",
    "Caramel Chocolate Chip": "#00FA9A"
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
            <div className="flex justify-center gap-4 mb-4">
              <button onClick={() => filterLastDays(7)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Past Week</button>
              <button onClick={() => filterLastDays(30)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Past Month</button>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Cookie Sales by Type</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={processSalesData()}
                    onClick={(e) => {
                      // Check if activePayload exists and has data before trying to access
                      if (e && e.activePayload && e.activePayload.length > 0) {
                        const selectedMonth = e.activePayload[0].payload.name;
                        setActiveMonth(selectedMonth); // set the month for which to display pie chart
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
                        <Cell key={`cell-${index}`} fill={COOKIE_COLORS[entry.name] || "#8884d8"} />
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
