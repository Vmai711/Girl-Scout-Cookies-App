import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { AngleDown } from "flowbite-react-icons/outline";
import { AngleUp } from "flowbite-react-icons/outline";
import { fetchCookieTypes, updateTransaction} from '../../firebase/firestore';

const TransactionsTable = ({ transactions }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedTransactions, setEditedTransactions] = useState({});
  const [cookieTypes, setCookieTypes] = useState([]); // State to store cookie types
  const [cookieSelections, setCookieSelections] = useState([]); // State for new cookie selections

  // Fetch the cookie types from Firestore when the component mounts
  useEffect(() => {
    const getCookieTypes = async () => {
      try {
        const types = await fetchCookieTypes(); // Fetch only cookie names

        setCookieTypes(types);
      } catch (error) {
        console.error("Error fetching cookie types:", error);
      }
    };

    getCookieTypes();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to calculate Total Boxes Sold and Reward Points
  const calculateTotals = (cookies) => {
    const totalBoxesSold = cookies?.reduce(
      (acc, cookie) => acc + Number(cookie.numCookies || 0),
      0
    );
    const rewardPoints = totalBoxesSold; // 1 point per box sold, adjust as needed
    return { totalBoxesSold, rewardPoints };
  };

  const handleEditTransaction = (transactionId) => {
    setEditingTransaction(transactionId);
  
    // Find the transaction by ID and initialize cookieSelections with its data
    const transactionToEdit = transactions.find((t) => t.id === transactionId);
    setCookieSelections(transactionToEdit.cookieSelections || []);
    
    // Update editedTransactions as well to ensure data consistency
    setEditedTransactions((prev) => ({
      ...prev,
      [transactionId]: [...transactionToEdit.cookieSelections],
    }));
  };
  
  const handleUpdateTransaction = async (transactionId) => {
    try {
      await updateTransaction(transactionId, {
          cookieSelections: editedTransactions[transactionId],
          numberOfBoxesSold: calculateTotals(editedTransactions[transactionId]).totalBoxesSold
      });    
      setEditingTransaction(null);
      setCookieSelections([]); // Reset cookieSelections
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleCancelEditTransaction = () => {
    // Reset the state to its original values (cancel edit)
    setEditingTransaction(null);
    setCookieSelections([]);  // Reset cookie selections to empty array or restore from original transaction if needed.
  };
  
  const handleCookieChange = (index, field, value) => {
    const updatedSelections = [...cookieSelections];
    updatedSelections[index][field] = value;
  
    // Update cookieSelections state
    setCookieSelections(updatedSelections);
  
    // Also update editedTransactions to keep it consistent
    setEditedTransactions((prev) => ({
      ...prev,
      [editingTransaction]: updatedSelections,
    }));
  };
  

  const addCookieSelection = () => {
    setCookieSelections([...cookieSelections, { cookie: '', numCookies: '' }]);
  };

  const removeCookieSelection = (index) => {
    const newCookieSelections = cookieSelections.filter((_, i) => i !== index);
    setCookieSelections(newCookieSelections);
  };

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Transaction ID</Table.HeadCell>
        <Table.HeadCell>Scout Name</Table.HeadCell>
        <Table.HeadCell>Total Boxes Sold</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Expand</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {transactions.map((transaction) => {
          const { totalBoxesSold, rewardPoints } = calculateTotals(
            editedTransactions[transaction.id] || transaction.cookieSelections
          );

          return (
            <React.Fragment key={transaction.id}>
              <Table.Row>
                <Table.Cell>{transaction.id}</Table.Cell>
                <Table.Cell>{transaction.girlName}</Table.Cell>
                <Table.Cell>{totalBoxesSold}</Table.Cell>
                <Table.Cell>
                  {transaction.timestamp
                    ? new Date(transaction.timestamp.toDate()).toLocaleDateString()
                    : "N/A"}
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleEditTransaction(transaction.id)} // Set the transaction for editing
                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit Receipt
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button onClick={() => toggleRow(transaction.id)}>
                    {expandedRows[transaction.id] ? (
                      <div>
                        <AngleUp />
                      </div>
                    ) : (
                      <div>
                        <AngleDown />
                      </div>
                    )}
                  </button>
                </Table.Cell>
              </Table.Row>

              {expandedRows[transaction.id] && (
                <Table.Row>
                  <Table.Cell colSpan={6}>
                    <div key={transaction.id} className="p-4 border rounded shadow-sm bg-gray-50">
                      <p><strong>Transaction ID:</strong> {transaction.id} </p>
                      <p><strong>Scout Name:</strong> {transaction.girlName} </p>
                      <p><strong>Parent Name:</strong> {transaction.parentName} </p>
                    
                      {/* Displaying multiple cookies */}
                      {editingTransaction !== transaction.id && (
                      <div>
                          <p><strong>Cookies:</strong></p>
                          <ul className="list-disc pl-6">
                          {transaction.cookieSelections?.map((cookieSelection, index) => (
                              <li key={index}>
                              {cookieSelection.cookie} ({cookieSelection.numCookies})
                              </li>
                          ))}
                          </ul>
                      </div>
                      )}

                      {/* Editable Cookies Section */}
                      {editingTransaction === transaction.id && (
                        <div className="mb-4">
                          <label className="block font-semibold">Cookies:</label>
                          {cookieSelections.map((cookieSelection, index) => (
                            <div key={index} className="flex gap-4 mb-4 items-center">
                              <select
                                value={cookieSelection.cookie}
                                onChange={(e) => handleCookieChange(index, 'cookie', e.target.value)}
                                required
                                className="w-1/2 p-2 border rounded"
                              >
                                <option value="">Select Cookie</option>
                                {cookieTypes.length > 0 ? (
                                  cookieTypes.map((cookie, i) => (
                                    <option key={i} value={cookie}>
                                      {cookie}
                                    </option>
                                  ))
                                ) : (
                                  <option value="">No Cookies Available</option>
                                )}
                              </select>
                              <input
                                type="number"
                                value={cookieSelection.numCookies}
                                onChange={(e) => handleCookieChange(index, 'numCookies', e.target.value)}
                                required
                                className="w-1/2 p-2 border rounded"
                                placeholder="Number of Cookies"
                              />
                              <button
                                type="button"
                                onClick={() => removeCookieSelection(index)}
                                className="text-red-500 ml-2"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addCookieSelection}
                            className="text-blue-500 mt-2"
                          >
                            Add another cookie
                          </button>
                        </div>
                      )}

                      {/* Displaying Total Boxes Sold and Reward Points */}
                      <p><strong>Total Boxes Sold:</strong> {totalBoxesSold}</p>
                      <p><strong>Reward Points:</strong> {rewardPoints}</p>
                      <p><strong>Timestamp:</strong> {transaction.timestamp ? new Date(transaction.timestamp.toDate()).toLocaleString() : "N/A"}</p>

                      {editingTransaction === transaction.id && (
                        <button
                          onClick={() => handleUpdateTransaction(transaction.id)}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Save Changes
                        </button>
                      )}

                      {editingTransaction === transaction.id && (
                        <button
                        onClick={handleCancelEditTransaction}
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                        >
                        Cancel
                        </button>
                      )}
         
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TransactionsTable;
