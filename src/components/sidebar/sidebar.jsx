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

const SideBar = ({ page }) => {
  const { currentRole, loading } = useUserRole();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [user, setUser] = useState(null);
  
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
    <div>
      <Sidebar aria-label="Default sidebar example" className="fixed top-0 left-0 z-4 [&>div]:bg-white">
        <div>Cookie App</div>
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
                Order Management Page
              </div>
            </Link>

            <Link
              to="/reservations"
              className={page === "reservations" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Store />
                Reservations Page
              </div>
            </Link>

            <Link
              to="/inventory"
              className={page === "inventory" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Inbox />
                Inventory Page
              </div>
            </Link>

            <Link
              to="/transactions"
              className={page === "transactions" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Receipt />
                Transaction Page
              </div>
            </Link>

            <Link
              to="/cookies"
              className={page === "cookies" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Palette />
                Cookies Page
              </div>
            </Link>

            <Link
              to="/messages"
              className={page === "messages" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3 items-center relative">
                <Messages />
                Message Page
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
                Rewards Page
              </div>
            </Link>

            <Link
              to="/booth"
              className={page === "booth" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Store />
                Booth Page
              </div>
            </Link>

            <Link
              to="/RoleChange"
              className={page === "rolechange" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
            >
              <div className="flex gap-3">
                <Store />
                Dev Role Change Page
              </div>
            </Link>

            {!loading && (currentRole === "cookie-manager" || currentRole === "admin") && (
              <Link
                to="/troops"
                className={page === "troops" ? "block text-center py-3 mb-2 rounded-md hover:bg-green-600 text-white p-2 bg-green-500" : "block text-center py-3 mb-2 rounded-md hover:bg-green-500 hover:text-white p-2 text-gray-600"}
              >
                <div className="flex gap-3">
                  <UsersGroup />
                  Troops Page
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
    </div>
  );
};

export default SideBar;
