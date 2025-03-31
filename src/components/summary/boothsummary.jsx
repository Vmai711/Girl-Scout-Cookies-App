import { useLocation } from "react-router-dom";

const BoothSummary = () => {
    const location = useLocation();
    const storedData = localStorage.getItem("boothData");
    const boothData = location.state || (storedData ? JSON.parse(storedData) : null);
    
    
    if (!boothData) {
        return <p>Error: No reservation data found.</p>;
    }
    
    return (
        <div>
            <h1>Reservation Summary</h1>
            <p>Email: {boothData.email}</p>
            <p>Scout Name: {boothData.girlName}</p>
            <p>Parent Name: {boothData.parentName}</p>
            <p>Location: {boothData.boothLocation}</p>
            <p>Starting Time: {boothData.startingTime}</p>
            <p>Date: {boothData.date}</p>
        </div>
    );
};

export default BoothSummary;
