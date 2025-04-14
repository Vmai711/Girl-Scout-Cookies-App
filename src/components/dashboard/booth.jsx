import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { saveReservation, fetchLocations, saveLocation } from '../../firebase/firestore';
import { useUserRole } from '../../firebase/roleUtils';

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const Booth = () => {
    const navigate = useNavigate();
    
    // Get logged-in user's email
    const { currentUser } = useAuth();
    const role = useUserRole();
    
    const [girlName, setGirlName] = useState('');
    const [parentName, setParentName] = useState('');
    const [boothLocations, setBoothLocations] = useState([]);
    const [boothLocation, setBoothLocation] = useState('');
    const [nameLocation, setNameLocation] = useState('');
    const [addressLocation, setAddressLocation] = useState('');
    const [startingTime, setStartTime] = useState('');
    const [date, setDate] = useState("");
    const [acceptedResponsibility, setAcceptedResponsibility] = useState(false);

    // Should be able to add locations (Troop Leader and Cookie Managers)
    useEffect(() => {
        const getLocations = async () => {
            try {
                const locations = await fetchLocations();  // Fetch the locations from Firebase
                console.log('Fetched locations:', locations);  // Log locations to see what is returned
                setBoothLocations(locations);  // Update the state with fetched locations
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
    
        getLocations();
    }, []);


    const handleAddLocation = async () => {
        if (nameLocation && addressLocation && !boothLocations.some(location => location.nameLocation === nameLocation)) {
            const newLocation = { nameLocation, addressLocation };
            setBoothLocations(prevLocations => [...prevLocations, newLocation]); // Add to the list
            setBoothLocation(newLocation); // Set the current booth location to the new location
            setNameLocation(''); // Clear name input
            setAddressLocation(''); // Clear address input
    
            const locationData = {
                nameLocation,
                addressLocation,
            };
    
            try {
                const locationId = await saveLocation(locationData);  // Save to Firestore
                alert(`Location ${nameLocation} at ${addressLocation} has been saved successfully! (ID: ${locationId})`);
            } catch (error) {
                console.error("Error saving location:", error);
                alert("Failed to save location. Please try again.");
            }
        } else {
            alert("Please enter a valid location name and address, or the location already exists.");
        }
    };



    const generateTimeSlots = (interval, startHour, endHour) => {
    let times = [];
    let startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0); // Start at the given startHour, at minute 0
    let endTime = new Date();
    endTime.setHours(endHour, 0, 0, 0); // End at the given endHour, at minute 0
    
    while (startTime <= endTime) {
        const hour = startTime.getHours();
        const minute = startTime.getMinutes();
        const formattedTime = `${hour > 12 ? hour - 12 : hour}:${minute === 0 ? '00' : minute < 10 ? '0' + minute : minute} ${hour >= 12 ? 'PM' : 'AM'}`;
        times.push(formattedTime);
        startTime.setMinutes(startTime.getMinutes() + interval); // Increment by interval
    }
    
    return times;
};

    const timeSlots = generateTimeSlots(15, 7, 19); // Generate 15-minute intervals;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Make sure 'acceptedResponsibility' is checked before proceeding
        if (!acceptedResponsibility) {
            alert("You must accept financial responsibility before submitting.");
            return;
        }
    
        // Data to be sent to the firebase collections database
        const boothData = {
            email: currentUser?.email || '',
            girlName,
            parentName,
            boothLocation: `${boothLocation.nameLocation} - ${boothLocation.addressLocation}`,
            startingTime,
            date,
            acceptedResponsibility,
            timestamp: new Date()
        };
        
        console.log("Booth Data before saving:", boothData); // Debugging log
        
    
        try {
            const boothId = await saveReservation(boothData);  
            alert(`Booth has been reserved successfully! (ID: ${boothId}) ${boothLocation.nameLocation} at ${boothLocation.addressLocation} has been reserved for ${startingTime} on ${date}`);
    
            localStorage.setItem("boothData", JSON.stringify(boothData)); 
            // Redirect only if the order is successfully submitted
            navigate("/boothsummary", { state: boothData });
         
        } catch (error) {
            // Stay on the page by not calling `navigate`
            console.error("Error reserving booth:", error);
            alert("There was an error reserving the booth. Please try again.");
        }
    };
    

    return (
        <div className="bg-custom-light-gray flex min-h-screen">
        <SideBar page={"booth"}/>
  
        <div className="w-full h-fit sm:ml-64">
          <Header page={"Booth"}/>
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
                            value={boothLocation.nameLocation || ''} // Displays selected location
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                if (selectedValue === "Add Location") {
                                    setBoothLocation({ nameLocation: "Add Location", addressLocation: "" });
                                } else {
                                    const selectedLocation = boothLocations.find(
                                        (booth) => booth.nameLocation === selectedValue
                                    );
                                    if (selectedLocation) {
                                        setBoothLocation({
                                            nameLocation: selectedLocation.nameLocation,
                                            addressLocation: selectedLocation.addressLocation
                                        });
                                    }
                                }
                            }}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Location</option>
                            {boothLocations.length > 0 ? (
                                boothLocations.map((booth) => (
                                    <option key={booth.id} value={booth.nameLocation}>
                                        {booth.nameLocation} - {booth.addressLocation}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No Locations Available</option>
                            )}
                            {(role === 'admin' || role === 'cookie-manager' || role === 'troop-leader') && (
                                <option value="Add Location">Add Location</option>
                            )}
                        </select>
                    
                        {/* Show input fields only when "Add Location" is selected */}
                        {boothLocation.nameLocation === "Add Location" && (
                            <div className="mt-2">
                                <label className="block font-semibold">Location Name:</label>
                                <input
                                    type="text"
                                    value={nameLocation}
                                    onChange={(e) => setNameLocation(e.target.value)}
                                    placeholder="Enter Location Name"
                                    className="w-full p-2 border rounded mb-2"
                                />
                                <label className="block font-semibold">Location Address:</label>
                                <input
                                    type="text"
                                    value={addressLocation}
                                    onChange={(e) => setAddressLocation(e.target.value)}
                                    placeholder="Enter Location Address"
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    type="button"
                                    onClick={handleAddLocation}
                                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                                >
                                    Add Location
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Schedule Time */}
                    <div className="mb-4">
                        <label className="block font-semibold">Starting Time:</label>
                        <select
                            value={startingTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                        >
                        <option value="">Select Time</option>
                            {timeSlots.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Schedule Date */}
                    <div className="mb-4">
                        <label className="block font-semibold">Date:</label>
                        <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                        />
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
