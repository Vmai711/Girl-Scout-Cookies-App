import { db } from './firebase'; // Ensure this correctly imports your Firebase setup
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

// Function to save an order to Firestore
export const saveOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            timestamp: serverTimestamp()// Adds a timestamp for order tracking
        });
        return docRef.id; // Returns the order ID
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};

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
