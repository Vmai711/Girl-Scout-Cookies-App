import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../firebase/firestore";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderList = await fetchOrders();
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Order Management</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
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
    </div>
  );
};

export default OrderManagement;
