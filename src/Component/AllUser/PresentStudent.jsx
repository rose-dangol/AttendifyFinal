import axios from "axios";
import React, { useEffect, useState } from "react";

const PresentStudent = () => {
  const[user,setUser]= useState()
  useEffect(() => {
    const fetchAttendanceLog = async () => {
      const res = await axios.get(
        "http://localhost:5000/attendance/getTodayUser"
      );
      setUser(res.data);
    };
    fetchAttendanceLog();
  }, []);
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Date</th>
            <th>Check-In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user && user.length > 0 ? (
        user.map((u) => (
          <tr key={u?.userId?._id}>
            <td>{u?.userId?._id}</td>
            <td>
              <span >{u?.userId?.username}</span>
            </td>
            <td>{new Date(u.createdAt).toISOString().split("T")[0]}</td>
            <td>{new Date(u.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>
              <span className="status-active">{u?.status}</span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            No users found
          </td>
        </tr>
      )}
          
        </tbody>
      </table>
    </div>
  );
};

export default PresentStudent;
