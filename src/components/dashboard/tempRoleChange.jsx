import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const RoleChange = () => {
  const [roles, setRoles] = useState([]);
  const [currentRole, setcurrentRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("parent-scout");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const ROLE_OPTIONS = ["cookie-manager", "parent-scout", "troop-leader"];

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchRoles = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setRoles(data.role || []);
        setcurrentRole(data.currentRole || "");
      }

      setLoading(false);
    };

    fetchRoles();
  }, [currentUser]);

  const handleAddRole = async () => {
    if (!selectedRole || !currentUser || roles.includes(selectedRole)) return;

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      role: arrayUnion(selectedRole),
    });

    setRoles(prev => [...prev, selectedRole]);
    setMessage(`Added role: ${selectedRole}`);
  };

  const handleRemoveRole = async (roleToRemove) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      role: arrayRemove(roleToRemove),
    });

    setRoles(prev => prev.filter(role => role !== roleToRemove));
    if (currentRole === roleToRemove) {
      await updateDoc(userRef, { currentRole: "" });
      setcurrentRole("");
    }
    setMessage(`Removed role: ${roleToRemove}`);
  };

  const handleSetcurrentRole = async (role) => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      currentRole: role,
    });

    setcurrentRole(role);
    setMessage(`Set main role to: ${role}`);
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar />
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Role Management"} />
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Role Testing Page</h1>

            {loading ? (
              <p className="text-gray-500">Loading roles...</p>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="font-semibold">Current Roles:</h2>
                  {roles.length === 0 ? (
                    <p className="text-gray-500 italic">No roles assigned.</p>
                  ) : (
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {roles.map((role) => (
                        <li key={role} className="flex justify-between items-center">
                          <span>
                            {role}
                            {currentRole === role && (
                              <span className="text-blue-500 text-sm ml-2">(Main)</span>
                            )}
                          </span>
                          <div className="flex gap-2">
                            {currentRole !== role && (
                              <button
                                onClick={() => handleSetcurrentRole(role)}
                                className="text-blue-500 text-sm hover:underline"
                              >
                                Set as Current
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveRole(role)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border rounded-md px-3 py-1 w-full"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddRole}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Add Role
                  </button>
                </div>

                {message && (
                  <p className="mt-3 text-green-600 text-sm">{message}</p>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoleChange;
