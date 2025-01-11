import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";

import OrderManagement from "./components/dashboard/order_management";
import Customers from "./components/dashboard/customers"; 
import Transactions from "./components/dashboard/transactions";
import Dashboard from "./components/dashboard/dashboard"; 

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";


function App() {
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/order-management", element: <OrderManagement /> },
    { path: "/customers", element: <Customers /> },
    { path: "/transactions", element: <Transactions /> },
  ];
  
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
