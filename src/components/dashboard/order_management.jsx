import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchOrders } from "../../firebase/firestore"; // Import the function

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderList = await fetchOrders(); // Fetch orders from Firestore
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Order Management</h1>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="p-4 border rounded shadow-sm">
                <p className="font-semibold">Girl's Name: {order.girlName}</p>
                <p>Parent: {order.parentName}</p>
                <p>Cookies: {order.cookieSelection} (x{order.numCookies})</p>
                <p>Pickup: {order.pickupLocation}</p>
                <p>Contact: {order.contactMethod}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
