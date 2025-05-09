import Login from "./components/auth/login";
import Register from "./components/auth/register";

//Home Components
import Index from "./components/home/index";
import Home from "./components/home/home";

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
import Reservations from "./components/dashboard/reservations";
import RoleChange from "./components/dashboard/tempRoleChange";
import ManageTransaction from "./components/dashboard/manage_transactions";

//Summary Components
import BoothSummary from "./components/summary/boothsummary";
import OrderSummary from "./components/summary/ordersummary";
import TransactionSummary from "./components/summary/transactionsummary";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/index", element: <Index /> },
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
    { path: "/transactionsummary", element: <TransactionSummary /> },
    { path: "/reservations", element: <Reservations /> },
    { path: "/rolechange", element: <RoleChange /> },
    { path: "/manage-transactions", element: <ManageTransaction /> },
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
