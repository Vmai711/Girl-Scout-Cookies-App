import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../firebase/firestore";
import { useNavigate } from "react-router-dom";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate(); 

  // Fetch orders from Firestore
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderList = await fetchOrders();
        setOrders(orderList);
        setFilteredOrders(orderList); // Initially, show all orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);

  // Filter function to show orders within a date range
  const filterOrders = () => {
    if (!startDate || !endDate) return; // Ensure both dates are selected

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the full day of the end date

    const filtered = orders.filter(order => {
      if (order.timestamp) {
        const orderDate = new Date(order.timestamp.toDate());
        return orderDate >= start && orderDate <= end;
      }
      return false;
    });

    setFilteredOrders(filtered);
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8">
            <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>

            {/* Date Range Filter */}
            <div className="mb-4">
              <label className="block text-gray-700">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
              
              <label className="block text-gray-700 mt-2">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={filterOrders}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Filter Orders
              </button>
            </div>

            {/* Display orders or error message if no orders exist */}
            {filteredOrders.length === 0 ? (
              <p>No orders found in the selected range.</p>
            ) : (
              <ul className="space-y-4">
                {filteredOrders.map((order) => (
                  <li key={order.id} className="p-4 border rounded shadow-sm bg-gray-50">
                    <p><strong>Girl's Name:</strong> {order.girlName}</p>
                    <p><strong>Parent's Name:</strong> {order.parentName}</p>
                    <p><strong>Cookies:</strong> {order.cookieSelection} ({order.numCookies})</p>
                    <p><strong>Pickup Location:</strong> {order.pickupLocation}</p>
                    <p><strong>Contact Method:</strong> {order.contactMethod}</p>
                    <p><strong>Timestamp:</strong> {order.timestamp ? new Date(order.timestamp.toDate()).toLocaleString() : "N/A"}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)} 
              className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
