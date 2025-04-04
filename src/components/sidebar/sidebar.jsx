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

const SideBar = () => {
  const role = useUserRole();
  const [storedRole, setStoredRole] = useState(localStorage.getItem("userRole") || null);
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

  useEffect(() => {
    if (role) {
      setStoredRole(role);
      localStorage.setItem("userRole", role);
    }
  }, [role]);

  return (
      <div>
        <Sidebar aria-label="Default sidebar example" className="fixed top-0 left-0 z-4 [&>div]:bg-white">
          <div>Cookie App</div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link
                to="/dashboard"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Grid/>
                  Dashboard Page
                </div>
              </Link>

              <Link
                to="/order-management"
                className="block text-center hover:text-black py-3 mb-2 rounded-md hover:bg-custom-dark-green p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Inbox/>
                  Order Management Page
                </div>
              </Link>

              <Link
                to="/reservations"
                className="block text-center hover:text-black py-3 mb-2 rounded-md hover:bg-custom-dark-green p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Store/>
                  Reservations Page
                </div>
              </Link>

              <Link
                to="/inventory"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Inbox/>
                  Inventory Page
                </div>
              </Link>

              <Link
                to="/transactions"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Receipt/>
                  Transaction Page
                </div>
              </Link>

              <Link
                to="/cookies"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Palette/>
                  Cookies Page
                </div>
              </Link>

              <Link
                to="/messages"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
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
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Award/>
                  Rewards Page
                </div>
              </Link>

              <Link
                to="/booth"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <Store/>
                  Booth Page
                </div>
              </Link>

              {(storedRole === "cookie-manager" || storedRole === "admin") && (
              <Link
                to="/troops"
                className="block text-center py-3 mb-2 rounded-md hover:bg-custom-dark-green hover:text-black p-2 text-gray-600"
              >
                <div className="flex gap-3">
                  <UsersGroup/>
                  Troops Page
                </div>
              </Link>
              )}

              <Link
                to="/order_form"
                className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2"
              >
                <div className="flex gap-3">
                  <Cart/>
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
