import React from "react";
// import { useAuth } from "../../contexts/authContext";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Dashboard = () => {
  // const { currentUser } = useAuth();

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem]">
          <div className="p-8 bg-gray-100 min-h-screen">
            <div className="bg-white max-w-4xl mx-auto p-6 rounded-md shadow-md">
              <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
              <p className="text-lg mb-4 text-center">Welcome to your dashboard!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
