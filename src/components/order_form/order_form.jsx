import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

import { saveOrder } from '../../firebase/firestore';

const Order = () => {
    const navigate = useNavigate();

    // Get logged-in user's email
    const { currentUser } = useAuth(); 
    
    const [girlName, setGirlName] = useState('');
    const [parentName, setParentName] = useState('');
    const [cookieSelection, setCookieSelection] = useState('');
    const [numCookies, setNumCookies] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [contactMethod, setContactMethod] = useState('');
    const [acceptedResponsibility, setAcceptedResponsibility] = useState(false);

    //Rename these to actual cookie names and add/delete as needed
    const cookieOptions = [
        'Cookies1', 'Cookies2', 'Cookies3', 'Cookies4', 'Cookies5',
        'Cookies6', 'Cookies7', 'Cookies8', 'Cookies9', 'Cookies10'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!acceptedResponsibility) {
            alert("You must accept financial responsibility before submitting.");
            return;
        }

        //Data that will be sent to the firebase collections database
        const orderData = {
            email: currentUser?.email || '',
            girlName,
            parentName,
            cookieSelection,
            numCookies,
            pickupLocation,
            contactMethod,
            acceptedResponsibility,
            timestamp: new Date()
        };

        try {
            const orderId = await saveOrder(orderData);  
            alert(`Order submitted successfully! Your Order ID is: ${orderId}`);
            
            // Redirect only if the order is successfully submitted
            navigate('/home');
        } catch (error) {
            // Stay on the page by not calling `navigate`
            console.error("Error submitting order:", error);
            alert("There was an error submitting your order. Please try again.");
        }
        // Redirect to home page
        navigate('/home');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
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

                {/* Cookie Selection */}
                <div className="mb-4">
                    <label className="block font-semibold">Select Cookie:</label>
                    <select 
                        value={cookieSelection}
                        onChange={(e) => setCookieSelection(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Cookies</option>
                        {cookieOptions.map((cookie, index) => (
                            <option key={index} value={cookie}>{cookie}</option>
                        ))}
                    </select>
                </div>

                {/* Number of Cookies */}
                <div className="mb-4">
                    <label className="block font-semibold">Number of Cookies:</label>
                    <input 
                        type="text"
                        value={numCookies}
                        onChange={(e) => setNumCookies(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
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

            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition"
            >
                Go Back
            </button>
        </div>
    );
};

export default Order;
