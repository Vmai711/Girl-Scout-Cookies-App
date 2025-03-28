import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div
        className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md"
        id="message"
      >
        <h2 className="text-lg font-bold text-orange-500 mb-2">Welcome</h2>
        <h1 className="text-xl font-light text-gray-600 mb-4">
          Hello {currentUser.displayName || currentUser.email}, you are now
          logged in.
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          This is the Test Home Page. More Stuff will be included.
        </p>
        <p className="text-sm text-gray-600 mb-4">Working links:</p>

        <Link
        to="/parentscout" 
        className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Parent/Scout Page
        </Link>

        <Link
        to="/cookiemanager" 
        className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Cookie Manager Page
        </Link>

        <Link
        to="/troopleader" 
        className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Troop Leader Page
        </Link>
{/*
        <Link
        to="/dashboard" 
        className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Dashboard Page
        </Link>

        <Link
          to="/order-management"
          className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Order Management Page
        </Link>

        <Link
          to="/troops"
          className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Troops Page
        </Link>

        <Link
          to="/transactions"
          className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Transaction Page
        </Link>

        <Link
          to="/cookies"
          className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Cookies Page
        </Link>

        <Link
          to="/messages"
          className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Message Page
        </Link>

        <Link
          to="/prizes"
          className="block text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Rewards Page
        </Link>
*/}
      </div>
    </div>
  );
};

export default Home;