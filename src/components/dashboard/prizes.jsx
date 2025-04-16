import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {doc, getDoc, setDoc } from "firebase/firestore";


import Header from "../header";
import SideBar from "../sidebar/sidebar";
import {Dropdown} from "flowbite-react";
import { useAuth } from "../../contexts/authContext";

const Prizes = () => {
  const {currentUser} = useAuth();
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  const [error, setError] = useState("");
  
  useEffect(() => {

    const FetchRewards = async() => {
      try{
        const rewardsRef = doc(db, "rewards", "exampleRewards");
        const rewardsSnap = await getDoc(rewardsRef);
        if(rewardsSnap.exists()){
          const rewardData = rewardsSnap.data();
          const formattedRewards = Object.entries(rewardData).map(([rewardName, details]) => ({
            name: rewardName,
            imageURL: details[0],
            pointCost: details[1],
          }));
          formattedRewards.sort((a, b) => a.pointCost - b.pointCost);
          setRewards(formattedRewards);
        }
      } catch(error){
        console.error("Error fetching Rewards", error);
        
      }
    };

    FetchRewards();
  }, [rewards]);

  useEffect(() => {
    
    const FetchRewardPoints = async() => {

      try{
        const rewardRef = doc(db, "rewardPoints", currentUser.uid);
        const rewardSnap = await getDoc(rewardRef);
        if(rewardSnap.exists()){
          const userData = rewardSnap.data();
          setUserPoints(userData['points']);
        } else{
          await setDoc(rewardRef, {userId: currentUser.uid, points: parseInt(0) })
          setUserPoints(rewardSnap.data()['points']);
        }
      }
      catch (err){
        setUserPoints(-1);
        setError("Error fetching reward points.");
        console.error(error);
      }
    };
    FetchRewardPoints();
  }, [currentUser, error]);
 

  return (
    <div className="bg-custom-light-gray flex min-h-screen">
      <SideBar page={"prizes"}/>

      <div className="w-full h-fit sm:ml-64">
        <Header page={"Awards"}/>
        <main className="mt-[3.5rem] p-8">
        <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Rewards Page</h1>
          <p>Manage your reward points.</p>
          <p>{userPoints}</p>
          <p>{currentUser.uid}</p>
        </div>
        <div style = {{display: "grid", gridTemplateColumns: "30% 30% 30%", columnGap: "5%", rowGap: "0%", paddingLeft: "5%", paddingRight: "5%", paddingTop: "5%"}}>
          {rewards.length > 0 ? rewards.map((reward, index) => (
            <div key = {index} style = {{backgroundColor: 'lightgray', padding: '10px', position: "relative", marginBottom: "15%"}}>
              <Dropdown
              arrowIcon = {false}
              style = {{width: "1.5vw", height: "1.5vw", position: "absolute", right: "5%", top: "5%"}}>
                <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown>
            <img src = {reward.imageURL} alt = {reward.name} style = {{borderRadius: "50%"}}></img>
            <p style = {{textAlign: "center"}}>{reward.name}</p>
            <button type = "button" className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2" style = {{position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: "10px", width: "100%"}}>
              <p>{reward.pointCost} Orders</p>
            </button>
            </div>
          )) : (
            <p className="text-center col-span-full">No rewards available.</p>
          )}
          {/* <div style = {{backgroundColor: 'lightgray', padding: '10px', position: "relative"}}>
            <Dropdown
            arrowIcon = {false}
            style = {{width: "1.5vw", height: "1.5vw", position: "absolute", right: "5%", top: "5%"}}>
              <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown>
            {/*<img alt = "No Image Available"></img>* uncomment /}
            <p style = {{textAlign: "center"}}>Test Reward Name</p>
            <button type = "button" className="block text-center bg-green-500 text-white py-3 mb-2 rounded-md shadow hover:bg-green-600 p-2" style = {{position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: "10px", width: "100%"}}>
              <p>1200+ Orders</p>
            </button>
          </div> */}

          
        </div>
        </main>
      </div>
    </div>
  );
};

export default Prizes;
