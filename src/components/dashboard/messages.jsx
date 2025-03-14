import React, { useState, useEffect } from "react";
import Header from "../header";
import SideBar from "../sidebar/sidebar";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");

  // make sure user stays logged in
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messagesData);
    });
    return () => unsubscribe();
  }, []);

  // Retrieve list of users
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        displayName: doc.data().displayName || doc.data().email || "Unknown",
      }));
      setUsers(usersData);
      // set a random user as default (first in db)
      if (!selectedRecipient) {
        const defaultRecipient = user
          ? usersData.find(u => u.id !== user.uid)
          : usersData[0];
        if (defaultRecipient) setSelectedRecipient(defaultRecipient.id);
      }
    });
    return () => unsubscribe();
  }, [user, selectedRecipient]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    if (!user) {
      alert("Please sign in to send messages.");
      return;
    }
    if (!selectedRecipient) {
      alert("Please select a recipient.");
      return;
    }
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        timestamp: serverTimestamp(),
        uid: user.uid,
        senderName: user.displayName || user.email,
        recipientId: selectedRecipient,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Filter messages between the current user and the selected recipient
  const filteredMessages = messages.filter(msg =>
    (msg.uid === user?.uid && msg.recipientId === selectedRecipient) ||
    (msg.uid === selectedRecipient && msg.recipientId === user?.uid)
  );

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar />
      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8">
          <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="recipient">
                Select Recipient:
              </label>
              <select
                id="recipient"
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="border p-2 w-full"
              >
                {users
                  .filter(u => u.id !== user?.uid)
                  .map(u => (
                    <option key={u.id} value={u.id}>
                      {u.displayName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4 max-h-80 overflow-y-auto">
              {filteredMessages.map(msg => (
                <div key={msg.id} className="p-2 border-b">
                  <p className="font-semibold">
                    {msg.senderName} {msg.uid === user?.uid && "(You)"}
                  </p>
                  <p>{msg.text}</p>
                  {msg.timestamp?.seconds && (
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp.seconds * 1000).toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex flex-col">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="border p-2 mb-2"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Send
              </button>
            </form>
            {!user && (
              <p className="text-red-500 text-sm mt-2">
                You must be signed in to send messages.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
