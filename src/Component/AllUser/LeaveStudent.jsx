import axios from 'axios';
import React, { useEffect, useState } from 'react'

const LeaveStudent = () => {
   const[user,setUser]= useState()
  useEffect(() => {
    const fetchAttendanceLog = async () => {
      const res = await axios.get(
        "http://localhost:5000/attendance/absentAttendance"
      );
      setUser(res.data);
    };
    fetchAttendanceLog();
  }, []);
  console.log(user)
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Absent-Date</th>
            <th>Absent Day Count</th>
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
            <td>{u?.userId?.absentCount}</td>
            <td>
              {
                u?.userId?.absentCount>=20?(<span className="status-inactive">Abnormak</span>):(<span className="status-active">Normal</span>)
              }
              
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
  )
}

export default LeaveStudent
