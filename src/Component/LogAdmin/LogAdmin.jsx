import React, { useEffect, useState } from "react";
import "./LogAdmin.css";
import Dashboard from "../Dashboard/Dashboard";
import TopNavbar from "../TopNavbar/TopNavbar";
import LogTableContent from "../LogTableContent/LogTableContent";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const LogAdmin = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  // const [IsAllowed,setIsAllowed] = useState(null);
  const [user, setUser] = useState([]);
  // useEffect(() => {
  //       const now = new Date();
  //       const hour = now.getHours();
  //       if ((hour === 8)) {
  //         fetchAttendanceLog()
  //       } else {
  //         null;
  //       }
  //   }, []);
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
    <div>
      <div className="attendance-log-container">
        <Dashboard />
        <div className="logAdmin-container">
          <TopNavbar />
          <div className="page-title">
            <span className="page-heading">Attendance Log</span>
            <span className="page-subtext">
              View and manage daily attendance logs.
            </span>
          </div>
          <div className="center-content">
            <div className="log-left-container">
              <div className="log-table-heading">
                <ReceiptLongOutlinedIcon
                  sx={{
                    fontSize: 25,
                    borderRadius: "8px",
                    marginRight: "5px",
                  }}
                />
                <span className="log-table-title">Daily Attendance Log</span>
              </div>
              <div className="table-container">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LogTableContent user={user} />
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="right-container-heading">
                <Groups3OutlinedIcon
                  sx={{
                    fontSize: 30,
                    borderRadius: "8px",
                    marginRight: "5px",
                  }}
                />
                <span>Aggregate Analytics</span>
              </div> */}
            <div className="right-container-bargraphs">
              <div className="attendance-card">
                <div className="icon-grid">
                  <div className="icon-item icon-1">📚</div>
                  <div className="icon-item icon-2">✓</div>
                  <div className="icon-item icon-3">🎓</div>
                  <div className="icon-item icon-4">📊</div>
                </div>

                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>

                <div className="text-content">
                  <div className="text-line">
                    <div className="lyogo">
                      
                        <img
                          src={"/images/logoBlack1.png"}
                          alt="Logo"
                          style={{ height: "58px", width: "70px" }}
                        />
                      
                      <span className="lyogo-title">ATTENDIFY</span>
                    </div>
                  </div>
                  <div className="text-line">
                    <span className="text-primary">Attendance </span>
                    <span className="text-secondary">made effortless,</span>
                  </div>
                  <div className="text-line">
                    <span className="text-accent">classrooms </span>
                    <span className="text-secondary">made smarter,</span>
                  </div>
                  <div className="text-line">
                    <span className="text-highlight">learning </span>
                    <span className="text-secondary">made better.</span>
                  </div>
                </div>

                <div className="pattern-overlay"></div>
              </div>
              {/* <BarChart
                  xAxis={[{ scaleType: "band", data: days }]}
                  series={[
                    {
                      data: [30],
                      label: "Present",
                      color: "#240029",
                    },
                    {
                      data: [3],
                      label: "Absent",
                      color: "#EF4444",
                    },
                  ]}
                  width={500}
                  height={350}
                /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAdmin;
