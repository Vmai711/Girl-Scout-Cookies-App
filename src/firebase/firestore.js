import { db } from './firebase'; // Ensure this correctly imports your Firebase setup
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Function to save an order to Firestore
export const saveOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            timestamp: Timestamp.now() // Adds a timestamp for order tracking
        });
        return docRef.id; // Returns the order ID
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};
