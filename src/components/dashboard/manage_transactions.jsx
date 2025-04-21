import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../../firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Header from "../header";
import SideBar from "../sidebar/sidebar";
import TransactionsTable from "../tables/transactions_table";

const ManageTransactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch transactions from Firestore
  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const currentRole = userSnap.data().currentRole;
          let transactionList = [];

          if (currentRole === "troop-leader" || currentRole === "admin") {
            transactionList = await fetchTransactions();
          } else {
            alert(`Current role is not troop leader, please change your role then return to this page (if applicable)`);
            navigate("/dashboard");
          }

          setTransactions(transactionList);
          setFilteredTransactions(transactionList);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [navigate]);

const handleSaveEdit = async (id, updatedData) => {
  try {
    // Calculate total boxes sold
    const totalBoxesSold = updatedData.selectedCookies?.reduce(
      (acc, cookie) => acc + Number(cookie.quantity || 0),
      0
    );

    // Example: 1 reward point per box
    const rewardPoints = totalBoxesSold;

    const dataToUpdate = {
      ...updatedData,
      totalBoxesSold,
      rewardPoints,
    };

    const docRef = doc(db, "transactions", id);
    await updateDoc(docRef, dataToUpdate);

    // Update state
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === id ? { ...txn, ...dataToUpdate } : txn
      )
    );
    setFilteredTransactions((prev) =>
      prev.map((txn) =>
        txn.id === id ? { ...txn, ...dataToUpdate } : txn
      )
    );
  } catch (err) {
    console.error("Error updating transaction:", err);
  }
};



  // Automatically filter transactions when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const filtered = transactions.filter((transaction) => {
        if (transaction.timestamp) {
          const transactionDate = new Date(transaction.timestamp.toDate());
          return transactionDate >= start && transactionDate <= end;
        }
        return false;
      });

      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [startDate, endDate, transactions]);


  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"manage transactions"} />
      <div className="w-full h-fit sm:ml-64">
        <Header page={"Manage Transactions/Receipts"} />
        <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Transactions/Receipts</h1>
            <div className="flex justify-center gap-4 mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading receipts...</p>
            ) : filteredTransactions.length === 0 ? (
              <p className="text-center">No transactions found in the selected range.</p>
            ) : (
              <TransactionsTable
              transactions={filteredTransactions}
              onSaveEdit={handleSaveEdit}
                />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageTransactions;
