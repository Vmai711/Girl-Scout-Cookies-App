import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContext";
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Inventory = () => {
    const { currentUser } = useAuth();
    const [inventory, setInventory] = useState([]);
    const [cookieTypes, setCookieTypes] = useState([]);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newQuantity, setNewQuantity] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState("");  // Set this to an empty string initially
    const [showAddItemForm, setShowAddItemForm] = useState(false);

    useEffect(() => {
        if (!currentUser) return;

        // Fetch the user's inventory
        const fetchInventory = async () => {
            try {
                const userInventoryRef = collection(db, "users", currentUser.uid, "inventory");
                const querySnapshot = await getDocs(userInventoryRef);
                setInventory(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                setError("Error fetching inventory.");
                console.error(err);
            }
        };

        // Fetch available cookie types (field names)
        const fetchCookieTypes = async () => {
            try {
                const docRef = doc(db, "cookieTypes", "Cookie Types Config");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Extract field names (cookie names) directly
                    setCookieTypes(Object.keys(docSnap.data()));
                } else {
                    console.error("No cookie types found.");
                }
            } catch (err) {
                console.error("Error fetching cookie types:", err);
            }
        };

        fetchInventory();
        fetchCookieTypes();
    }, [currentUser]);

    // Update inventory quantity
    const handleUpdate = async (id, change) => {
        if (!currentUser) return;
        const item = inventory.find(item => item.id === id);
        if (!item || item.quantity + change < 0) return setError("Quantity cannot be negative.");

        try {
            const itemRef = doc(db, "users", currentUser.uid, "inventory", id);
            await updateDoc(itemRef, { quantity: item.quantity + change });
            setInventory(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + change } : item));
        } catch (err) {
            setError("Error updating inventory.");
            console.error(err);
        }
    };

    // Save the edited inventory quantity
    const handleSaveEdit = async (id) => {
        if (!currentUser || newQuantity === "" || isNaN(newQuantity) || newQuantity < 0) 
            return setError("Please enter a valid quantity.");

        try {
            const itemRef = doc(db, "users", currentUser.uid, "inventory", id);
            await updateDoc(itemRef, { quantity: parseInt(newQuantity) });
            setInventory(prev => prev.map(item => item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item));
            setNewQuantity("");
            setEditingId(null);
        } catch (err) {
            setError("Error saving edited quantity.");
            console.error(err);
        }
    };

    // Handle adding a new item to inventory
    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!currentUser || !newItemName.trim() || newItemQuantity === "" || isNaN(newItemQuantity) || newItemQuantity <= 0) 
            return setError("Please select a valid cookie and quantity.");

        try {
            const userInventoryRef = collection(db, "users", currentUser.uid, "inventory");
            await addDoc(userInventoryRef, { name: newItemName, quantity: parseInt(newItemQuantity) });

            const querySnapshot = await getDocs(userInventoryRef);
            setInventory(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            setNewItemName("");
            setNewItemQuantity(""); 
            setShowAddItemForm(false);
            setError("");
        } catch (err) {
            setError("Error adding item to inventory.");
            console.error(err);
        }
    };

    return (
        <div className="bg-custom-light-gray flex min-h-screen">
            <SideBar />
            <div className="w-full h-fit sm:ml-64">
                <Header page={"Inventory Management"} />
                <main className="mt-[3.5rem] p-8">
                    <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
                        <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        {/* Add Item Button / Form Toggle */}
                        {!showAddItemForm ? (
                            <button
                                onClick={() => setShowAddItemForm(true)}
                                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                            >
                                Add Item
                            </button>
                        ) : (
                            <form onSubmit={handleAddItem} className="mb-6">
                                <h2 className="text-xl mb-4">Add New Item</h2>
                                <div className="mb-4">
                                    <label className="block">Select Cookie Type</label>
                                    <select
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Select a Cookie</option>
                                        {cookieTypes.map((cookie, index) => (
                                            <option key={index} value={cookie}>{cookie}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block">Initial Quantity</label>
                                    <input
                                        type="number"
                                        value={newItemQuantity}
                                        onChange={(e) => setNewItemQuantity(e.target.value.replace(/^0+/, ""))}  
                                        className="w-full p-2 border rounded"
                                        required
                                        min="1"
                                        placeholder="Enter quantity"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                >
                                    Add Item
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddItemForm(false)}
                                    className="mt-2 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}

                        {/* Inventory List */}
                        <ul className="space-y-4">
                            {inventory.map((item) => (
                                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                                    <span>{item.name}</span>
                                    <div className="flex items-center space-x-2">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleUpdate(item.id, -1)}> - </button>
                                        {editingId === item.id ? (
                                            <input type="number" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} className="w-16 p-2 border rounded text-center" onBlur={() => handleSaveEdit(item.id)} autoFocus />
                                        ) : (
                                            <span
                                                onClick={() => { setEditingId(item.id); setNewQuantity(item.quantity); }}
                                                className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
                                                style={{ minWidth: "60px", textAlign: "center" }}
                                            >
                                                {item.quantity} boxes
                                            </span>
                                        )}
                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => handleUpdate(item.id, 1)}> + </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Inventory;
