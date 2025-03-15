import React from "react";

import Header from "../header";
import SideBar from "../sidebar/sidebar";
import {Dropdown} from "flowbite-react";

const Prizes = () => {
  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar/>

      <div className="w-full h-fit sm:ml-64">
        <Header />
        <main className="mt-[3.5rem] p-8">
        <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Rewards Page</h1>
          <p>Manage your reward points.</p>
        </div>
        <div style = {{display: "grid", gridTemplateColumns: "30% 30% 30%", columnGap: "5%", rowGap: "10%", paddingLeft: "5%", paddingRight: "5%", paddingTop: "1%"}}>
          <div style = {{backgroundColor: 'lightgray', padding: '10px', position: "relative"}}>
            <Dropdown
            arrowIcon = {false}
            style = {{width: "1.5vw", height: "1.5vw", position: "absolute", right: "5%", top: "5%"}}>
              <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown>
            {/*<img alt = "No Image Available"></img>*/}
            <p style = {{textAlign: "center"}}>Test Reward Name</p>
            <button type = "button" className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2" style = {{position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: "10px", width: "100%"}}>
              <p>1200+ Orders</p>
            </button>
          </div>

          <div style = {{backgroundColor: 'lightgray', padding: '10px', position: "relative"}}>
            <Dropdown
            arrowIcon = {false}
            style = {{width: "1.5vw", height: "1.5vw", position: "absolute", right: "5%", top: "5%"}}>
              <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown>
            {/*<img alt = "No Image Available"></img>*/}
            <p style = {{textAlign: "center"}}>Test Reward Name</p>
            <button type = "button" className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2" style = {{position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: "10px", width: "100%"}}>
              <p>1200+ Orders</p>
            </button>
          </div>
          
          <div style = {{backgroundColor: 'lightgray', padding: '10px', position: "relative"}}>
            <Dropdown
            arrowIcon = {false}
            style = {{width: "1.5vw", height: "1.5vw", position: "absolute", right: "5%", top: "5%"}}>
              <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown>
            {/*<img alt = "No Image Available"></img>*/}
            <p style = {{textAlign: "center"}}>Test Reward Name</p>
            <button type = "button" className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2" style = {{position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: "10px", width: "100%"}}>
              <p>1200+ Orders</p>
            </button>
          </div>

          <div style = {{backgroundColor: 'lightgray', padding: '10px', position: "relative"}}>
            <Dropdown
            arrowIcon = {false}
            style = {{width: "1.5vw", height: "1.5vw", position: "absolute", right: "5%", top: "5%"}}>
              <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown>
            {/*<img alt = "No Image Available"></img>*/}
            <p style = {{textAlign: "center"}}>Test Reward Name</p>
            <button type = "button" className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2" style = {{position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: "10px", width: "100%"}}>
              <p>1200+ Orders</p>
            </button>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Prizes;
