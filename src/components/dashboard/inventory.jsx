import React, { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContext";
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from "firebase/firestore";

import Header from "../header";
import SideBar from "../sidebar/sidebar";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { Table } from "flowbite-react";

const Inventory = () => {
  const { currentUser } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newCookieName, setNewCookieName] = useState("");
  const [newCookieQuantity, setNewCookieQuantity] = useState(0);

  const fetchInventory = useCallback(async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const inventoryRef = collection(userRef, "inventory");
    const querySnapshot = await getDocs(inventoryRef);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInventory(items);
  }, [currentUser]);

  useEffect(() => {
    fetchInventory();
  }, [currentUser, fetchInventory]);

  const handleSaveEdit = async (id) => {
    const itemRef = doc(db, "users", currentUser.uid, "inventory", id);
    await updateDoc(itemRef, { quantity: Number(newQuantity) });
    setEditingId(null);
    fetchInventory();
  };

  const handleDelete = async (id) => {
    const itemRef = doc(db, "users", currentUser.uid, "inventory", id);
    await deleteDoc(itemRef);
    fetchInventory();
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleAddCookie = async () => {
    if (!newCookieName || newCookieQuantity <= 0) {
      alert("Please provide a valid name and quantity for the new cookie.");
      return;
    }

    const quantity = Number(newCookieQuantity);

    const userRef = doc(db, "users", currentUser.uid);
    const inventoryRef = collection(userRef, "inventory");
    await addDoc(inventoryRef, {
      name: newCookieName,
      quantity: quantity,
    });

    setNewCookieName("");
    setNewCookieQuantity(0);
    setIsAddFormOpen(false);
    fetchInventory();
  };

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"inventory"}/>
      <div className="w-full sm:ml-64 h-fit">
        <Header page={"Inventory Management"} />
        <main className="mt-[3.5rem] p-8">
          <div className="bg-white max-w-4xl mx-auto p-6 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Inventory</h1>
              <button
                onClick={() => setIsAddFormOpen(true)}
                className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-2 rounded-full"
              >
                <HiPlus className="text-white text-2xl" />
              </button>
            </div>

            {isAddFormOpen && (
              <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Add New Cookie</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Cookie Name
                  </label>
                  <input
                    type="text"
                    value={newCookieName}
                    onChange={(e) => setNewCookieName(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter cookie name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={newCookieQuantity}
                    onChange={(e) => setNewCookieQuantity(e.target.value.replace(/^0+/, ""))}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddCookie}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md mr-4"
                  >
                    Add Cookie
                  </button>
                  <button
                    onClick={() => setIsAddFormOpen(false)}
                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Cookie Name</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {inventory.map((item) => (
                    <React.Fragment key={item.id}>
                      <Table.Row>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          {editingId === item.id ? (
                            <input
                              type="number"
                              value={newQuantity}
                              onChange={(e) => setNewQuantity(e.target.value.replace(/^0+/, ""))}
                              onBlur={() => handleSaveEdit(item.id)}
                              autoFocus
                              className="w-20 px-2 py-1 border rounded text-center"
                            />
                          ) : (
                            item.quantity
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setNewQuantity(item.quantity);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            title="Edit"
                          >
                            <HiOutlinePencil />
                          </button>
                          <button
                            onClick={() => {
                              setItemToDelete(item.id);
                              setIsModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <HiOutlineTrash />
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    </React.Fragment>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-xs">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm mb-4">Are you sure you want to delete this cookie?</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(itemToDelete)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
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

export default Inventory;
