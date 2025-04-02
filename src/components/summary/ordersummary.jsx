import { useLocation } from "react-router-dom";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const BoothSummary = () => {
    const location = useLocation();
    const storedData = localStorage.getItem("orderData");
    const orderData = location.state || (storedData ? JSON.parse(storedData) : null);
    
    
    if (!orderData) {
        return <p>Error: No order data found.</p>;
    }

    return (
        <div className="bg-custom-light-gray flex min-h-screen">
          <SideBar />
          <div className="w-full h-fit sm:ml-64">
            <Header page={"Order Summary"}/>
            <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>
                <h2 className="text-2xl font mb-6 text-center">You can check your other orders in the Order Management Page </h2>
                <div className="w-full p-2">
                    <p>Email: {orderData.email}</p>
                </div>

                <div className="w-full p-2">
                    <p>Scout Name: {orderData.girlName}</p>
                </div>

                <div className="w-full p-2">
                    <p>Parent Name: {orderData.parentName}</p>
                </div>

                <div className="w-full p-2">
                    <p>Cookies Ordered</p>
                    <ul className="list-disc pl-6">
                    {orderData.cookieSelections?.map((cookieSelection, index) => (
                    <li key={index}>
                    {cookieSelection.cookie} ({cookieSelection.numCookies})
                    </li>
                    ))}
                    </ul>
                </div>


                <div className="w-full p-2">
                    <p>Contact Method: {orderData.contactMethod}</p>
                </div>

                <div className="w-full p-2">
                    <p>Pickup Location: {orderData.pickupLocation}</p>
                </div>

                <div className="w-full p-2">
                    <p>Time of Order: {new Date(orderData.timestamp).toLocaleString()}</p>
                </div> 

              </div>
            </main>
          </div>
        </div>
      );

};

export default BoothSummary;
