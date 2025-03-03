import { db } from './firebase'; // Ensure this correctly imports your Firebase setup
import { collection, addDoc, serverTimestamp, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

// Function to save an order to Firestore
export const saveOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            timestamp: serverTimestamp() // Adds a timestamp for order tracking
        });
        return docRef.id; // Returns the order ID
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};

// Fetch orders from Firestore
export const fetchOrders = async () => {
    try {
        const ordersCollection = collection(db, "orders");
        const snapshot = await getDocs(ordersCollection);
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

// Save a reservation to Firestore
export const saveReservation = async (boothData) => {
    try {
        console.log("Saving booth reservation:", boothData); // Log data before saving
        const docRef = await addDoc(collection(db, 'reservations'), {
            ...boothData,
            timestamp: serverTimestamp() // Adds a timestamp for order tracking
        });
        console.log("Booth reserved successfully with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving reservation:', error);
        throw error;
    }
};

// Fetch Cookie Types from Firestore
export const fetchCookieTypes = async () => {
    try {
        const docRef = doc(db, "cookieTypes", "Cookie Types Config");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().Types || []; 
        } else {
            console.error("No such document!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching cookie types:", error);
        throw new Error("Failed to fetch cookie types");
    }
};

// Update Cookie Types in Firestore
export const updateCookieTypes = async (updatedTypes) => {
    try {
        const docRef = doc(db, "cookieTypes", "Cookie Types Config");
        await updateDoc(docRef, {
            Types: updatedTypes, 
        });
        console.log("Cookie types updated successfully!");
    } catch (error) {
        console.error("Error updating cookie types:", error);
        throw new Error("Failed to update cookie types");
    }
};
