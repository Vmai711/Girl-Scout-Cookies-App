import React from "react";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Troops = () => {
  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8">
        <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Troops Page</h1>
          <p>Manage your troops.</p>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Troops;
