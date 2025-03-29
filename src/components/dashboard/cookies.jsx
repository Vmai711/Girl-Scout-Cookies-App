import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { getDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { useUserRole } from "../../firebase/roleUtils";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Cookies = () => {
  const [cookies, setCookies] = useState([]);
  const [editingCookie, setEditingCookie] = useState(null);
  const [cookieToRemove, setCookieToRemove] = useState(null);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [newCookie, setNewCookie] = useState({ name: "", imageUrl: "", description: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const role = useUserRole();

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const docRef = doc(db, "cookieTypes", "Cookie Types Config");
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const cookieData = docSnap.data();
          const formattedCookies = Object.entries(cookieData).map(([cookieName, details]) => ({
            name: cookieName,
            imageUrl: details[0],
            description: details[1],
          }));
    
          formattedCookies.sort((a, b) => a.name.localeCompare(b.name));
          setCookies(formattedCookies);
        }
      } catch (error) {
        console.error("Error fetching cookies:", error);
      }
    };

    fetchCookies();
  }, []);

  const handleRemoveCookie = async () => {
    if (cookieToRemove) {
      try {
        const docRef = doc(db, "cookieTypes", "Cookie Types Config");
        await updateDoc(docRef, { [cookieToRemove]: deleteField() });
        setCookies(cookies.filter(cookie => cookie.name !== cookieToRemove));
        setCookieToRemove(null);
      } catch (error) {
        console.error("Error removing cookie:", error);
      }
    }
  };

  const handleEditCookie = (cookie) => {
    setEditingCookie({ ...cookie, editableName: cookie.name });
  };

  const handleSaveEditedCookie = async () => {
    if (!editingCookie.editableName.trim()) {
      alert("Cookie name is required!");
      return;
    }

    try {
      const docRef = doc(db, "cookieTypes", "Cookie Types Config");

      // Check if the name has changed
      if (editingCookie.editableName !== editingCookie.name) {
        // Update Firestore with the new cookie name (check if it's a valid name)
        await updateDoc(docRef, {
          [editingCookie.editableName]: [
            editingCookie.imageUrl,
            editingCookie.description,
            editingCookie.editableName, 
          ],
          // Optionally delete the old cookie name
          [editingCookie.name]: deleteField(),
        });
        
        // Immediately update the local state to reflect the change
        setCookies(cookies.map(cookie =>
          cookie.name === editingCookie.name
            ? { ...cookie, name: editingCookie.editableName, editableName: editingCookie.editableName }
            : cookie
        ));
      } else {
        // If name is not changed, just update the other fields
        await updateDoc(docRef, {
          [editingCookie.name]: [
            editingCookie.imageUrl,
            editingCookie.description,
            editingCookie.editableName,
          ],
        });
        
        // Immediately update the local state to reflect the change
        setCookies(cookies.map(cookie =>
          cookie.name === editingCookie.name
            ? { ...cookie, imageUrl: editingCookie.imageUrl, description: editingCookie.description }
            : cookie
        ));
      }

      setEditingCookie(null);
    } catch (error) {
      console.error("Error saving edited cookie:", error);
    }
  };

  const handleChange = (e, field) => {
    setEditingCookie((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleAddNewCookie = async () => {
    if (!newCookie.name.trim()) {
      alert("Cookie name is required!");
      return;
    }

    try {
      const docRef = doc(db, "cookieTypes", "Cookie Types Config");
      await updateDoc(docRef, { [newCookie.name]: [newCookie.imageUrl, newCookie.description, newCookie.name] });
      setCookies([...cookies, { ...newCookie, editableName: newCookie.name }]);
      setNewCookie({ name: "", imageUrl: "", description: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding new cookie:", error);
    }
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar />
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Cookies"}/>
        <main className="mt-[3.5rem] p-8">
          <div className="bg-white w-full mx-auto p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Cookies</h1>

            {role === "cookie-manager" && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => {
                    setShowEditButtons(!showEditButtons)
                    setEditingCookie()}} 
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                >
                  {showEditButtons ? "Cancel" : "Edit Cookies"}
                </button>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add New Cookie
                </button>
              </div>
            )}

            {showAddForm && (
              <div className="mb-6 p-4 bg-gray-100 rounded-md shadow">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold">Add New Cookie</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
                <input
                  type="text"
                  value={newCookie.name}
                  onChange={(e) => setNewCookie({ ...newCookie, name: e.target.value })}
                  placeholder="Cookie Name"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={newCookie.imageUrl}
                  onChange={(e) => setNewCookie({ ...newCookie, imageUrl: e.target.value })}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  value={newCookie.description}
                  onChange={(e) => setNewCookie({ ...newCookie, description: e.target.value })}
                  placeholder="Description"
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleAddNewCookie}
                  className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Add Cookie
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cookies.length > 0 ? cookies.map((cookie, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                  <h2 className="text-xl font-semibold">
                    {editingCookie?.name === cookie.name ? (
                      <input
                        type="text"
                        value={editingCookie.editableName} // Display editable name here
                        onChange={(e) => handleChange(e, 'editableName')}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      cookie.name
                    )}
                  </h2>
                  {editingCookie?.name === cookie.name ? (
                    <input
                      type="text"
                      value={editingCookie.imageUrl}
                      onChange={(e) => handleChange(e, 'imageUrl')}
                      placeholder="Image URL"
                      className="w-full p-2 border rounded mb-2"
                    />
                  ) : (
                    cookie.imageUrl && <img src={cookie.imageUrl} alt={cookie.name} className="w-full h-40 object-cover rounded-md mt-2" />
                  )}
                  {editingCookie?.name === cookie.name ? (
                    <textarea
                      value={editingCookie.description}
                      onChange={(e) => handleChange(e, 'description')}
                      placeholder="Description"
                      className="w-full p-2 border rounded mb-2"
                    />
                  ) : (
                    <p className="text-gray-600 mt-2">{cookie.description}</p>
                  )}

                  {role === "cookie-manager" && showEditButtons && (
                    <>
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => setCookieToRemove(cookie.name)}
                          className="bg-red-500 text-white px-2 py-1 rounded-full"
                        >
                          X
                        </button>
                      </div>
                      {editingCookie?.name === cookie.name ? (
                        <div className="absolute bottom-2 right-2">
                          <button
                            onClick={handleSaveEditedCookie}
                            className="bg-green-500 text-white px-2 py-1 rounded-full"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="absolute bottom-2 right-2">
                          <button
                            onClick={() => handleEditCookie(cookie)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-full"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )) : (
                <p className="text-center col-span-full">No cookies available.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {cookieToRemove && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to remove this cookie?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleRemoveCookie}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setCookieToRemove(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cookies;
