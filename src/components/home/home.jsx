import React from "react";
import { useAuth } from "../../contexts/authContext";
import { useUserRole } from "../../firebase/roleUtils";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Home = () => {
  const { currentUser } = useAuth();
  const { currentRole } = useUserRole();

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem]">
          <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md" id="message">
            <h2 className="text-lg font-bold text-orange-500 mb-2">Welcome</h2>
            <h1 className="text-xl font-light text-gray-600 mb-4">
              Hello {currentUser.displayName || currentUser.email}, you are now logged in as the role {currentRole}. To change your role, click on the Role Change option on the side.
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              This is the Girl Scouts Home Page. Cilck on one of the icons on the left to go to that page.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
