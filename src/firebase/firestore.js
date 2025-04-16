import { db } from './firebase'; // Ensure this correctly imports your Firebase setup
import { collection, addDoc, serverTimestamp, Timestamp, getDocs, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

/**
 * Save an order to both the global 'orders' collection and the user's specific order collection.
 */
export const saveOrder = async (orderData, userId) => {
    try {
        // Add order to global 'orders' collection
        const globalOrderRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            timestamp: serverTimestamp() // Adds a timestamp for order tracking
        });

        // Add order to user-specific 'orders' collection
        const userOrderRef = doc(db, `users/${userId}/orders`, globalOrderRef.id);
        await setDoc(userOrderRef, {
            ...orderData,
            timestamp: serverTimestamp() // Ensures the same timestamp format
        });

        return globalOrderRef.id; // Returns the order ID
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};

/**
 * Fetch all orders from the global 'orders' collection.
 */
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

/**
 * Fetch orders for a specific user from their personal 'orders' collection.
 */
export const fetchUserOrders = async (userId) => {
    try {
        const userOrdersCollection = collection(db, `users/${userId}/orders`);
        const snapshot = await getDocs(userOrdersCollection);
        const userOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userOrders;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};

/**
 * Fetch deadlines
 */
export const fetchDeadlines = async () => {
    const deadlinedoc = doc(db, "deadlines", "deadlines");
    const snapshot = await getDoc(deadlinedoc);

    if (snapshot.exists()) {
        const data = snapshot.data();

        return {
            preorderDeadline: data.preorderDeadline instanceof Timestamp
                ? data.preorderDeadline.toDate()
                : new Date(data.preorderDeadline),
            orderDeadline: data.orderDeadline instanceof Timestamp
                ? data.orderDeadline.toDate()
                : new Date(data.orderDeadline),
        };
    }

    return null;
};

/**
 * Update deadlines
 */
export const updateDeadlines = async (newDeadlines) => {
    const deadlinedoc = doc(db, "deadlines", "deadlines");

    const preorder = new Date(newDeadlines.preorderDeadline);
    preorder.setDate(preorder.getDate() + 1); // optional: remove if not needed

    const order = new Date(newDeadlines.orderDeadline);
    order.setDate(order.getDate() + 1); // optional: remove if not needed

    await updateDoc(deadlinedoc, {
        preorderDeadline: Timestamp.fromDate(preorder),
        orderDeadline: Timestamp.fromDate(order),
    });
};

/**
 * Save a booth reservation to Firestore.
 */
export const saveReservation = async (boothData) => {
    try {
        console.log("Saving booth reservation:", boothData);
        const docRef = await addDoc(collection(db, 'reservations'), {
            ...boothData,
            timestamp: serverTimestamp()
        });
        console.log("Booth reserved successfully with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving reservation:', error);
        throw error;
    }
};

/**
 * Fetch user's reservations from Firestore.
 */
export const fetchReservations = async () => {
    try {
        const reservationsCollection = collection(db, "reservations");
        const snapshot = await getDocs(reservationsCollection);
        const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return reservations;
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
    }
};

/**
 * Save a new location to Firestore.
 */
export const saveLocation = async (locationData) => {
    try {
        console.log("Saving new location:", locationData);
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

/**
 * Fetch all locations from Firestore.
 */
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

/**
 * Fetch cookie types from Firestore.
 */
export const fetchCookieTypes = async () => {
    try {
        const docRef = doc(db, "cookieTypes", "Cookie Types Config");
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

/**
 * Update cookie types in Firestore.
 */
export const updateCookieTypes = async (updatedTypes) => {
    try {
        const docRef = doc(db, "cookieTypes", "Cookie Types Config");
        await updateDoc(docRef, { Types: updatedTypes });
        console.log("Cookie types updated successfully!");
    } catch (error) {
        console.error("Error updating cookie types:", error);
        throw new Error("Failed to update cookie types");
    }
};
