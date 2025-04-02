import Login from "./components/auth/login";
import Register from "./components/auth/register";

//Home Components
import Home from "./components/home";
import ParentScout from "./components/home/parentscout";
import CookieManager from "./components/home/cookiemanager";
import TroopLeader from "./components/home/troopleader";

//Dashboard Components
import OrderManagement from "./components/dashboard/order_management";
import Transactions from "./components/dashboard/transactions";
import Dashboard from "./components/dashboard/dashboard";
import Prizes from "./components/dashboard/prizes";
import Troops from "./components/dashboard/troops";
import Cookies from "./components/dashboard/cookies";
import Messages from "./components/dashboard/messages";
import Inventory from "./components/dashboard/inventory";
import Order from "./components/order_form/order_form";
import Booth from "./components/dashboard/booth";

//Summary Components
import BoothSummary from "./components/summary/boothsummary";
import OrderSummary from "./components/summary/ordersummary";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/parentscout", element: <ParentScout /> },
    { path: "/cookiemanager", element: <CookieManager /> },
    { path: "/troopleader", element: <TroopLeader /> },
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
    { path: "/inventory", element: <Inventory /> },
    { path: "/order_form", element: <Order /> },
    { path: "/booth", element: <Booth /> },
    { path: "/boothsummary", element: <BoothSummary /> },
    { path: "/ordersummary", element: <OrderSummary /> },
  ];

  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      {/* <Header /> */}
      <div className="w-full h-screen">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
