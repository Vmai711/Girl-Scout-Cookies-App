import { useLocation } from "react-router-dom";

import Header from "../header";
import SideBar from "../sidebar/sidebar";

const TransactionSummary = () => {
    const location = useLocation();
    const storedData = localStorage.getItem("transactionData");
    const transactionData = location.state || (storedData ? JSON.parse(storedData) : null);
    
    
    if (!transactionData) {
        return <p>Error: No transaction data found.</p>;
    }

    return (
        <div className="bg-custom-light-gray flex min-h-screen">
          <SideBar />
          <div className="w-full h-fit sm:ml-64">
            <Header page={"Transaction Summary"}/>
            <main className="mt-[3.5rem] p-8 bg-gray-100 min-h-screen">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Transaction Summary</h1>
                <h2 className="text-2xl font mb-6 text-center">You can check your rewards points in the Rewards Page</h2>
                <div className="w-full p-2">
                    <p>Email: {transactionData.email}</p>
                </div>

                <div className="w-full p-2">
                    <p>Scout Name: {transactionData.girlName}</p>
                </div>

                <div className="w-full p-2">
                    <p>Parent Name: {transactionData.parentName}</p>
                </div>

                <div className="w-full p-2">
                    <p>Cookies Ordered</p>
                    <ul className="list-disc pl-6">
                    {transactionData.cookieSelections?.map((cookieSelection, index) => (
                    <li key={index}>
                    {cookieSelection.cookie} ({cookieSelection.numCookies})
                    </li>
                    ))}
                    </ul>
                </div>


                <div className="w-full p-2">
                    <p>Total boxes sold: {transactionData.numberOfBoxesSold}</p>
                </div>

              </div>
            </main>
          </div>
        </div>
      );

};

export default TransactionSummary;
