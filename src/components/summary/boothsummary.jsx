import { useLocation } from "react-router-dom";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const BoothSummary = () => {
    const location = useLocation();
    const storedData = localStorage.getItem("boothData");
    const boothData = location.state || (storedData ? JSON.parse(storedData) : null);
    
    
    if (!boothData) {
        return <p>Error: No reservation data found.</p>;
    }

    return (
        <div className="bg-custom-light-gray flex min-h-screen">
          <SideBar />
          <div className="w-full h-fit sm:ml-64">
            <Header page={"Booth Summary"}/>
            <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Booth Summary</h1>
                <h2 className="text-2xl font mb-6 text-center">You can check this reservation in the Reservations Page </h2>
                <div className="w-full p-2">
                    <p>Email: {boothData.email}</p>
                </div>

                <div className="w-full p-2">
                    <p>Scout Name: {boothData.girlName}</p>
                </div>

                <div className="w-full p-2">
                    <p>Parent Name: {boothData.parentName}</p>
                </div>

                <div className="w-full p-2">
                    <p>Location: {boothData.boothLocation}</p>
                </div>

                <div className="w-full p-2">
                    <p>Starting Time: {boothData.startingTime}</p>
                </div>

                <div className="w-full p-2">
                    <p>Date: {new Date(new Date(boothData.date).setDate(new Date(boothData.date).getDate() + 1)).toLocaleDateString("en-US", { timeZone: "America/Chicago" })}</p>
                </div> 
                
                <div className="w-full p-2">
                    <p>Time of Reservation: {new Date(boothData.timestamp).toLocaleString()}</p>
                </div> 
                
              </div>
            </main>
          </div>
        </div>
      );

};

export default BoothSummary;
