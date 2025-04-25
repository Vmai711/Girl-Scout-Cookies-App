import React from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelection = async (selectedRole) => {
    if (!currentUser || !selectedRole) return;
  
    const userRef = doc(db, "users", currentUser.uid);
  
    try {
      // Add role to array if it doesn't exist
      await updateDoc(userRef, {
        role: arrayUnion(selectedRole),
        currentRole: selectedRole, // set as active role
      });
  
      navigate("/home");
    } catch (error) {
      console.error("Error updating role in Firebase:", error);
    }
  };

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
          Please select your role using one of the links.
        </p>
        <p className="text-sm text-gray-600 mb-4">Working links:</p>

        {/* Buttons instead of Links to update role */}
        <button
          onClick={() => handleRoleSelection("parent/scout")}
          className="block w-full text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Parent/Scout Page
        </button>

        <button
          onClick={() => handleRoleSelection("troop-leader")}
          className="block w-full text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Troop Leader Page
        </button>

        <button
          onClick={() => handleRoleSelection("cookie-manager")}
          className="block w-full text-center bg-blue-500 text-white py-3 mb-2 rounded-md shadow hover:bg-blue-600"
        >
          Cookie Manager Page
        </button>
      </div>
    </div>
  );
};

export default Index;
