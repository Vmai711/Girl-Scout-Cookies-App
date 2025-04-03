import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { saveOrder, fetchCookieTypes } from '../../firebase/firestore';

import Header from '../header';
import SideBar from '../sidebar/sidebar';

const Order = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [girlName, setGirlName] = useState('');
    const [parentName, setParentName] = useState('');
    const [cookieSelections, setCookieSelections] = useState([{ cookie: '', numCookies: '' }]);
    const [pickupLocation, setPickupLocation] = useState('');
    const [contactMethod, setContactMethod] = useState('');
    const [acceptedResponsibility, setAcceptedResponsibility] = useState(false);
    const [cookieTypes, setCookieTypes] = useState([]);

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

    const handleCookieChange = (index, field, value) => {
        const newCookieSelections = [...cookieSelections];
        newCookieSelections[index][field] = value;
        setCookieSelections(newCookieSelections);
    };

    const addCookieSelection = () => {
        setCookieSelections([...cookieSelections, { cookie: '', numCookies: '' }]);
    };

    const removeCookieSelection = (index) => {
        const newCookieSelections = cookieSelections.filter((_, i) => i !== index);
        setCookieSelections(newCookieSelections);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!acceptedResponsibility) {
            alert("You must accept financial responsibility before submitting.");
            return;
        }
    
        const orderData = {
            email: currentUser?.email || '',
            girlName,
            parentName,
            cookieSelections,
            pickupLocation,
            contactMethod,
            acceptedResponsibility,
        };
    
        try {
            const orderId = await saveOrder(orderData, currentUser.uid); // Pass user ID
            alert(`Order submitted successfully! Your Order ID is: ${orderId}`);
            localStorage.setItem("orderData", JSON.stringify(orderData));
            navigate("/ordersummary", { state: orderData });
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("There was an error submitting your order. Please try again.");
        }
    };
    
    return (
        <div className="bg-custom-light-gray flex min-h-screen">
            <SideBar />
            <div className="w-full h-fit sm:ml-64">
                <Header page={"Order Form"}/>
                <main className="mt-[3.5rem] p-8">
                    <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Girl Scout Cookie Order Form</h2>
                        <form onSubmit={handleSubmit}>

                            {/* Email (Autofilled) */}
                            <div className="mb-4">
                                <label className="block font-semibold">Email:</label>
                                <input 
                                    type="email"
                                    value={currentUser?.email || ''}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>

                            {/* Girl's Name */}
                            <div className="mb-4">
                                <label className="block font-semibold">Girl's Name:</label>
                                <input 
                                    type="text"
                                    value={girlName}
                                    onChange={(e) => setGirlName(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            {/* Parent's Name */}
                            <div className="mb-4">
                                <label className="block font-semibold">Parent's Name:</label>
                                <input 
                                    type="text"
                                    value={parentName}
                                    onChange={(e) => setParentName(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            {/* Cookie Selections */}
                            <div className="mb-4">
                                <label className="block font-semibold">Select Cookies:</label>
                                {cookieSelections.map((cookieSelection, index) => (
                                    <div key={index} className="flex gap-4 mb-4 items-center">
                                        <select
                                            value={cookieSelection.cookie}
                                            onChange={(e) => handleCookieChange(index, 'cookie', e.target.value)}
                                            required
                                            className="w-1/2 p-2 border rounded"
                                        >
                                            <option value="">Select Cookie</option>
                                            {cookieTypes.map((cookie, i) => (
                                                <option key={i} value={cookie}>{cookie}</option>
                                            ))}
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

                            {/* Pickup Location */}
                            <div className="mb-4">
                                <label className="block font-semibold">Pickup Location:</label>
                                <input 
                                    type="text"
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            {/* Contact Method */}
                            <div className="mb-4">
                                <label className="block font-semibold">How do you wish to be contacted?</label>
                                <input 
                                    type="text"
                                    value={contactMethod}
                                    onChange={(e) => setContactMethod(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            {/* Financial Responsibility Agreement */}
                            <div className="mb-4">
                                <label className="block font-semibold">I understand that I will be financially responsible for these cookies:</label>
                                <div className="flex items-center">
                                    <input 
                                        type="radio"
                                        name="responsibility"
                                        checked={acceptedResponsibility}
                                        onChange={() => setAcceptedResponsibility(true)}
                                        required
                                        className="mr-2"
                                    />
                                    <span>Yes</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className={`w-full text-white p-2 rounded transition ${acceptedResponsibility ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!acceptedResponsibility}
                            >
                                Submit Order
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Order;
