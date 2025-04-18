import React, { useEffect, useState } from "react";
import { fetchOrders, fetchUserOrders } from "../../firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Header from "../header";
import SideBar from "../sidebar/sidebar";
import OrderManagementTable from "../tables/order_management_table";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firestore
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const currentRole = userSnap.data().currentRole;  
          let orderList = [];

          if (currentRole === "parent-scout") {
            orderList = await fetchUserOrders(user.uid);
          } else {
            orderList = await fetchOrders();
          }

          setOrders(orderList);
          setFilteredOrders(orderList);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  // Automatically filter orders when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const filtered = orders.filter((order) => {
        if (order.timestamp) {
          const orderDate = new Date(order.timestamp.toDate());
          return orderDate >= start && orderDate <= end;
        }
        return false;
      });

      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [startDate, endDate, orders]);

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"order-management"}/>
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Order Management"} />
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Order Management</h1>
            <div className="flex justify-center gap-4 mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-center">No orders found in the selected range.</p>
            ) : (
              <OrderManagementTable orders={filteredOrders} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
