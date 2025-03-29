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

// Save reservation to Firestore
export const saveReservation = async (boothData) => {
    try {
        console.log("Saving booth reservation:", boothData); // Log data before saving
        const docRef = await addDoc(collection(db, 'reservations'), {
            ...boothData,
            timestamp: serverTimestamp() // Adds a timestamp for reservation
        });
        console.log("Booth reserved successfully with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving reservation:', error);
        throw error;
    }
};

// Save location to Firestore
export const saveLocation = async (locationData) => {
    try {
        console.log("Saving new location:", locationData); // Log data before saving
        const docRef = await addDoc(collection(db, 'locations'), {
            ...locationData
        });
        console.log("Location saved successfully with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving location:', error);
        throw error;
    }
};

export const fetchLocations = async () => {
    try {
        const locationCollection = collection(db, "locations");
        const snapshot = await getDocs(locationCollection);
        const locations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return locations;
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
    }
};

// Fetch Cookie Types from Firestore
export const fetchCookieTypes = async () => {
    try {
      const docRef = doc(db, "cookieTypes", "Cookie Types Config"); // Reference to the config document
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return Object.keys(docSnap.data()); // Only return the cookie names
      } else {
        console.log("No cookie types found!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cookie types:", error);
      return [];
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
