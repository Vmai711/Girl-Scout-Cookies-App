import React from "react";
import { Link } from "react-router-dom";

import { Sidebar } from "flowbite-react";

// Icons
import { Grid } from "flowbite-react-icons/outline";
import { Inbox } from "flowbite-react-icons/outline";
import { Receipt } from "flowbite-react-icons/outline";
import { Palette } from "flowbite-react-icons/outline";
import { Messages } from "flowbite-react-icons/outline";
import { Award } from "flowbite-react-icons/outline";
import { Store } from "flowbite-react-icons/outline";
import { Cart } from "flowbite-react-icons/outline";


const SideBar = () => {

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
                <div className="flex gap-3">
                  <Messages/>
                  Message Page
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
