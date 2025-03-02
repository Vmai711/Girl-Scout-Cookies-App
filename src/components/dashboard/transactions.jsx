import React from "react";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Transactions = () => {
  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8">
        <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Transaction Management</h1>
          <p>Manage your transactions here.</p>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
