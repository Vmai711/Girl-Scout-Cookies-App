import React from "react";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Cookies = () => {
  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Cookies Page</h1>
          <p className="text-lg mb-4 text-center">Cookies Page</p>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Cookies;
