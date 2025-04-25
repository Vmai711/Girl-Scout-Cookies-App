import React, { useState, useEffect } from "react";
import Header from "../header";
import SideBar from "../sidebar/sidebar";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";
import { useUserRole } from '../../firebase/roleUtils';

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const { currentRole } = useUserRole();
  const isCookieManager = currentRole === 'cookie-manager';
  // Auto-default to 'orders' thread for managers
  useEffect(() => {
    if (isCookieManager && !selectedRecipient) {
      setSelectedRecipient('orders');
    }
  }, [isCookieManager,selectedRecipient]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Messages listener
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

  // Retrieve list of users from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        displayName: doc.data().displayName || doc.data().email || "Unknown",
      }));
      setUsers(usersData);
      // Set a default recipient if none is selected
      if (!selectedRecipient && user) {
        const defaultRecipient = null;
        if (defaultRecipient) setSelectedRecipient(defaultRecipient.id);
      }
    });
    return () => unsubscribe();
  }, [user, selectedRecipient]);

  // Thread list
  const orderThread = { id: 'orders', displayName: 'Orders' };
  const oneToOneThreads = users.filter(u =>
    messages.some(msg =>
      (msg.uid === user?.uid && msg.recipientId === u.id) ||
      (msg.uid === u.id && msg.recipientId === user?.uid)
    )
  );
  const threadUsers = [
    ...(isCookieManager ? [orderThread] : []),
    ...oneToOneThreads
  ];

  // Filter messages
  const filteredMessages = selectedRecipient === 'orders'
    ? messages.filter(msg => msg.recipientId === 'orders')
    : messages.filter(msg =>
        (msg.uid === user?.uid && msg.recipientId === selectedRecipient) ||
        (msg.uid === selectedRecipient && msg.recipientId === user?.uid)
      );

  // Mark messages as read
  useEffect(() => {
    const markMessagesAsRead = async () => {
      filteredMessages.forEach(async (msg) => {
        if (msg.recipientId === user?.uid && msg.read === false) {
          const msgRef = doc(db, "messages", msg.id);
          await updateDoc(msgRef, { read: true });
        }
      });
    };
    if (user && selectedRecipient) {
      markMessagesAsRead();
    }
  }, [filteredMessages, user, selectedRecipient]);

  // Filter users for search
  const filteredUsers = users.filter(u =>
    u.id !== user?.uid && u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display name for header
  const selectedRecipientName =
    selectedRecipient === 'orders'
      ? 'Orders'
      : users.find(u => u.id === selectedRecipient)?.displayName || "Messages";

  // Unread messages
  const unreadThreadIds = new Set(
    messages
      .filter(msg => msg.recipientId === user?.uid && msg.read === false)
      .map(msg => msg.uid)
  );

  // Send message handler
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
        read: false,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"messages"}/>
      <div className="flex w-full h-fit sm:ml-64">
        {/* thread list and search */}
        <div
          className={`w-80 bg-gray-100 p-4 border-r h-screen overflow-y-auto ${
            selectedRecipient ? 'hidden' : 'block'
          } md:block`}
        >
          <button
            onClick={() => setSearchVisible(!searchVisible)}
            className="mb-4 text-blue-600 font-bold text-xl"
          >
            +
          </button>

          {searchVisible && (
            <div className="mb-4">
              <input
                id="userSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter username or email"
                className="border p-2 w-full"
              />
              {searchTerm && filteredUsers.length > 0 && (
                <ul className="border p-2 mt-2 max-h-40 overflow-y-auto">
                  {filteredUsers.map(u => (
                    <li
                      key={u.id}
                      onClick={() => {
                        setSelectedRecipient(u.id);
                        setSearchVisible(false);
                        setSearchTerm("");
                      }}
                      className={`cursor-pointer p-1 hover:bg-gray-200 ${
                        selectedRecipient === u.id ? "bg-gray-300" : ""
                      }`}
                    >
                      {u.displayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <ul>
            {threadUsers.map(u => (
              <li
                key={u.id}
                onClick={() => setSelectedRecipient(u.id)}
                className={`p-2 cursor-pointer hover:bg-gray-300 ${
                  selectedRecipient === u.id ? "bg-gray-300" : ""
                }`}
              >
                <span>{u.displayName}</span>
                {u.id !== 'orders' && unreadThreadIds.has(u.id) && (
                  <span className="ml-3 bg-red-500 text-white text-xs rounded-full px-2">New</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main message area */}
        <div
          className={`flex-grow bg-white ${
            selectedRecipient ? 'block' : 'hidden'
          } md:block`}
        >
          {/* mobile back button */}
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <button
              onClick={() => setSelectedRecipient("")}
              className="text-blue-600 ml-12 font-bold"
            >
              Back
            </button>
            <span className="font-semibold">{selectedRecipientName}</span>
            <div />
          </div>

          {/* desktop header */}
          <Header page={selectedRecipientName} className="hidden md:block" />

          <main className="mt-[3.5rem] p-8 h-[calc(100vh-3.5rem)]">
            <div className="bg-white h-full max-w-4xl mx-auto p-6 rounded-md shadow-md flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4">
                {filteredMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-2 flex flex-col ${
                      msg.uid === user?.uid ? 'items-end text-right' : 'items-start text-left'
                    }`}
                  >
                    <div
                      className={`inline-block px-6 py-4 rounded-lg max-w-md ${
                        msg.uid === user?.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                      }`}
                      style={{ borderBottom: "1px solid transparent" }}
                    >
                      <p className="text-base mt-1">{msg.text}</p>
                      {msg.timestamp?.seconds && (
                        <span
                          className={`text-xs block mt-1 ${
                            msg.uid === user?.uid ? 'text-white' : 'text-gray-500'
                          }`}>
                          {new Date(msg.timestamp.seconds * 1000).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex flex-col">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="border p-2 mb-2 rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Send
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;
