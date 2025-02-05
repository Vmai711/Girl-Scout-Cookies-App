import Login from "./components/auth/login";
import Register from "./components/auth/register";
import GoogleRoleSelection from './components/auth/register/GoogleRoleSelection';

import Header from "./components/header";
import Home from "./components/home";

import OrderManagement from "./components/dashboard/order_management";
import Transactions from "./components/dashboard/transactions";
import Dashboard from "./components/dashboard/dashboard"; 
import Prizes from "./components/dashboard/prizes";
import Troops from "./components/dashboard/troops";
import Cookies from "./components/dashboard/cookies";
import Messages from "./components/dashboard/messages";
import Order from "./components/order_form/order_form";

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
    { path: "/troops", element: <Troops /> },
    { path: "/transactions", element: <Transactions /> },
    { path: "/cookies", element: <Cookies /> },
    { path: "/messages", element: <Messages /> },
    { path: "/prizes", element: <Prizes /> },
    { path: "/select-role", element: <GoogleRoleSelection /> },
    { path: "/order_form", element: <Order /> },
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
