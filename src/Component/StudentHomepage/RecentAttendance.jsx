import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentAttendance = ({ userData }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchlast7days = async () => {
      const res = await axios.get(
        `http://localhost:5000/attendance/last7days/${userData._id}`
      );
      setUser(res.data);
    };
    fetchlast7days();
  }, []);
  // console.log(user)

  return (
    <div className="recent-attendance">
      <h3>
        Recent Attendance <span>(Last 7 days)</span>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Username</th>
            <th>Check In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user && user.length > 0 ?(user.map((user) => (
            <tr>
              <td>{new Date(user.createdAt).toISOString().split("T")[0]}</td>
              <td>{user?.userId?.username}</td>
              <td>{new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>
                <span className={`status ${user.status === "Present" ? "present" : "late"}`}>
                  {user?.status}
                </span>
              </td>
            </tr>
          ))):(
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

export default RecentAttendance;
