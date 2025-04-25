import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserRole } from "../../firebase/roleUtils";
import { Sidebar } from "flowbite-react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Icons
import { Grid } from "flowbite-react-icons/outline";
import { Inbox } from "flowbite-react-icons/outline";
import { Receipt } from "flowbite-react-icons/outline";
import { Palette } from "flowbite-react-icons/outline";
import { Messages } from "flowbite-react-icons/outline";
import { Award } from "flowbite-react-icons/outline";
import { Store } from "flowbite-react-icons/outline";
import { Cart } from "flowbite-react-icons/outline";
import { UsersGroup } from "flowbite-react-icons/outline";
import { AddressBook } from "flowbite-react-icons/outline";
import { Cog } from "flowbite-react-icons/outline";
import { Bars } from "flowbite-react-icons/outline";

const SideBar = ({ page }) => {
  const { currentRole, loading } = useUserRole();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const messagesRef = collection(db, "messages");
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const unread = snapshot.docs.filter((doc) => {
        const msg = doc.data();
        return msg.recipientId === user.uid && msg.read === false;
      });
      setUnreadMessages(unread.length);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <>
      {/* Toggle button on mobile */}
      <button
        type="button"
        className="fixed top-2 left-6 z-50 p-2 focus:outline-none md:hidden"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <Bars className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar hidden on mobile when collapsed, always show on bigger screens */}
      <Sidebar
        aria-label="Sidebar navigation"
        className={`${collapsed ? 'hidden' : ''} fixed top-0 left-0 h-full md:block z-40 [&>div]:bg-white`}
      >
        {/* Space for mobile toggle overlap */}
        <div className="pt-3 md:pt-0 text-center font-bold">Cookie Bytes</div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link
              to="/dashboard"
                            className={page === "dashboard" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Grid />
                Dashboard Page
              </div>
            </Link>

            <Link
              to="/order-management"
              className={page === "order-management" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Inbox />
                Orders Management
              </div>
            </Link>

            <Link
              to="/reservations"
              className={page === "reservations" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <AddressBook />
                Reservations
              </div>
            </Link>

            {!loading && (currentRole === "troop-leader" || currentRole === "admin") && (
              <Link
                to="/manage-transactions"
                className={page === "manage transactions" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
              >
                <div className="flex gap-3">
                  <UsersGroup />
                  Manage Transactions
                </div>
              </Link>
            )}

            <Link
              to="/inventory"
              className={page === "inventory" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Inbox />
                Inventory
              </div>
            </Link>

            <Link
              to="/transactions"
              className={page === "transactions" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Receipt />
                Transactions
              </div>
            </Link>

            <Link
              to="/cookies"
              className={page === "cookies" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Palette />
                Cookies
              </div>
            </Link>

            <Link
              to="/messages"
              className={page === "messages" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3 items-center relative">
                <Messages />
                Messages
                {unreadMessages > 0 && (
                  <span className="absolute right-[-15px] bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full relative">
                    {unreadMessages}
                  </span>
                )}
              </div>
            </Link>

            <Link
              to="/prizes"
              className={page === "prizes" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Award />
                Prizes
              </div>
            </Link>

            <Link
              to="/booth"
              className={page === "booth" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Store />
                Booth
              </div>
            </Link>

            <Link
              to="/RoleChange"
              className={page === "rolechange" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Cog />
                Role Change
              </div>
            </Link>

            {!loading && (currentRole === "cookie-manager" || currentRole === "admin") && (
              <Link
                to="/troops"
                className={page === "troops" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
              >
                <div className="flex gap-3">
                  <UsersGroup />
                  Troops
                </div>
              </Link>
            )}

            <Link
              to="/order_form"
              className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2"
            >
              <div className="flex gap-3">
                <Cart />
                Order Girl Scout Cookies
              </div>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default SideBar;