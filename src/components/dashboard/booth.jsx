import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { saveReservation } from '../../firebase/firestore';

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Booth = () => {
    const navigate = useNavigate();
    
    // Get logged-in user's email
    const { currentUser } = useAuth(); 
    
    const [girlName, setGirlName] = useState('');
    const [parentName, setParentName] = useState('');
    const [boothLocation, setBoothLocation] = useState('');
    const [startingTime, setStartTime] = useState('');
    const [acceptedResponsibility, setAcceptedResponsibility] = useState(false);

    // Should be able to add locations (Troop Leader and Cookie Managers)
    const BoothLocations = [
        'Walmart', 'Kroger', 'Movie Theater', 'Store'
    ];
    
    // Will find some way to properly set time
    const TimeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!acceptedResponsibility) {
            alert("You must accept financial responsibility before submitting.");
            return;
        }

        //Data that will be sent to the firebase collections database
        const boothData = {
            email: currentUser?.email || '',
            girlName,
            parentName,
            boothLocation,
            startingTime,
            acceptedResponsibility,
            timestamp: new Date()
        };

        try {
            const boothId = await saveReservation(boothData);  
            alert(`Booth has been reserved successfully! (ID: ${boothId}) ${boothLocation} has been reserved for ${startingTime}`);
            
            // Redirect only if the order is successfully submitted
            navigate('/home');
        } catch (error) {
            // Stay on the page by not calling `navigate`
            console.error("Error reserving booth:", error);
            alert("There was an error reserving the booth. Please try again.");
        }
        // Redirect to home page
        navigate('/home');
    };

    return (
        <div className="bg-custom-light-gray flex min-h-screen">
        <SideBar/>
  
        <div className="w-full h-fit sm:ml-64">
          <Header />
          <main className="mt-[3.5rem] p-8">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Booth Reservation Form</h2>

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

                    {/* Booth Location */}
                    <div className="mb-4">
                        <label className="block font-semibold">Booth Location:</label>
                        <select
                            type="text"
                            value={boothLocation}
                            onChange={(e) => setBoothLocation(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        >
                        <option value="">Select Location</option>
                            {BoothLocations.map((booth, index) => (
                                <option key={index} value={booth}>{booth}</option>
                            ))}
                        </select>
                    </div>

                    {/* Schedule Time */}
                    <div className="mb-4">
                        <label className="block font-semibold">Starting Time:</label>
                        <select
                            type="text"
                            value={startingTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        >
                        <option value="">Select Time</option>
                            {TimeSlots.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    {/* Booth Confirmation */}
                    <div className="mb-4">
                        <label className="block font-semibold">Make sure that you have selected the correct booth as well as the correct date and time:</label>
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                name="responsibility"
                                checked={acceptedResponsibility}
                                onChange={() => setAcceptedResponsibility(true)}
                                required
                                className="mr-2"
                            />
                            <span>I have confirmed that I have selected the correct booth, date, and time</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`w-full text-white p-2 rounded transition ${acceptedResponsibility ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!acceptedResponsibility}
                    >
                        Submit Reservation
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
          </main>
        </div>
      </div>
    );
};

export default Booth;
