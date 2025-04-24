import React, { useEffect, useState } from "react";
import { fetchOrders, fetchUserOrders } from "../../firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Header from "../header";
import SideBar from "../sidebar/sidebar";
import OrderManagementTable from "../tables/order_management_table";
import { Select } from "flowbite-react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterState] = useState("")

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

  // Automatically filter orders when date range changes and order status
  useEffect(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (end) end.setHours(23, 59, 59, 999);
  
    const filtered = orders
      .filter((order) => {
        if (!order.timestamp) return false;
        const orderDate = new Date(order.timestamp.toDate());
  
        if (start && end) {
          return orderDate >= start && orderDate <= end;
        } else if (start) {
          return orderDate >= start;
        } else if (end) {
          return orderDate <= end;
        }
        return true;
      })
      .filter((order) => {
        if (!filterStatus) return true;
        return order.orderStatus === filterStatus;
      });
  
    setFilteredOrders(filtered);
  }, [startDate, endDate, filterStatus, orders]);
  

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"order-management"}/>
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Order Management"} />
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Order Management</h1>
            <div className="flex justify-between gap-4 mb-4">
              <div className="flex gap-4 justify-center">
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

              <Select onChange={(e) => setFilterState(e.target.value)}>
                <option value="">--Filter by Order Status--</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="confirmed">Confirmed</option>
              </Select>
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
