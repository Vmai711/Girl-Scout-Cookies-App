import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export const fetchInventory = async () => {
  const inventoryRef = collection(db, 'inventory');
  const snapshot = await getDocs(inventoryRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateInventoryItem = async (id, updatedData) => {
  const itemRef = doc(db, 'inventory', id);
  await updateDoc(itemRef, updatedData);
};
