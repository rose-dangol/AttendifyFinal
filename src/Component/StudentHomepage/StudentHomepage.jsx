import React, { useEffect, useState } from "react";
import "./StudentHomepage.css";
import Header from "./Header";
import StatusCard from "./StatusCard";
import RecentAttendance from "./RecentAttendance";
import Notifications from "./Notifications";

import Dashboard from "../Dashboard/Dashboard";
import TopNavbar from "../TopNavbar/TopNavbar";
import axios from "axios";
import attendance from "../../../backend-node/models/attendance";



const StudentHomepage = () => {
  const [user,setUser]=useState();
  const[count,setCount]=useState(5);
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  useEffect(()=>{
    const fetchupdatedUser = async()=>{
      const updatedUserRes = await axios.get(
        `http://localhost:5000/user/${userData._id}`
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserRes.data));
    }
    fetchupdatedUser();
  },[])
useEffect(() => {
  const updateAt8AM = () => {
    setCount(prev => prev + 1);
    const now = new Date();
    const next8AM = new Date();
    next8AM.setDate(now.getDate() + 1);
    next8AM.setHours(8, 0, 0, 0);
    const msUntilNext8AM = next8AM.getTime() - now.getTime(); 
    timeout = setTimeout(updateAt8AM, msUntilNext8AM);
  };
  const now = new Date();
  const next8AM = new Date();
  next8AM.setHours(8, 0, 0, 0);
  if (now >= next8AM) {
    next8AM.setDate(next8AM.getDate() + 1);
  }
  let timeout = setTimeout(updateAt8AM, next8AM.getTime() - now.getTime());

  return () => clearTimeout(timeout); 
}, []);

  useEffect(() => {
    const fetchlast7days = async () => {
      const res = await axios.get(
        `http://localhost:5000/attendance/todayAttendance/${userData._id}`
      );
      setUser(res.data);
    };
    fetchlast7days();
  }, []);
  const date = new Date("2025-09-02T04:36:10.847Z").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  console.log(user)
  return (
    <div className="StudentHomepage">
      <Dashboard/>
    <div className="StudentHomepage-center">
      <Header />
      <div className="cards-row">
        <StatusCard
          title="Today's Status"
          subtitle={user==null||undefined? "Today Attendace Not Taken Yet" : user[0]?.status} 
          extra={date}
          tag=""
        />
        <StatusCard
          title="This Week"
          subtitle={`${userData?.presentCountWeek}/${count>7?0:count} days`}
          extra={`${Math.floor((userData?.presentCountWeek / count) * 100)}% attendance rate`}
          tag=""
        />
        <StatusCard
          title="This Month"
          // subtitle={`${userData?.presentCountMonth}/${count>30?0:count}  days`} 
          subtitle={`${userData?.presentCountMonth}/25  days`}   //
          extra={`${Math.floor((userData?.presentCountMonth / count) * 100)>50?"Your performance is good":"Your performance is not sastisfactory"}`}
          tag=""
        />
      </div>

      <div className="bottom-row">
        <RecentAttendance userData={userData}/>
      </div>
    </div>
    </div>
  )
}

export default StudentHomepage


