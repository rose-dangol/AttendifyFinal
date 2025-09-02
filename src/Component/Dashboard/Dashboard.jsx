import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

// menu icons
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

// toggle icons
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Dashboard = () => {
  const [drop, setDrop] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [loggedUser, setLoggedUSer] = useState();
  const navigate = useNavigate();

  const dropClicked = (e) => {
    setDrop(false);
    setArrow(false);
    // console.log("bye");
  };
  const crossClicked = (e) => {
    setDrop(true);
    setTimeout(() => {
      setArrow(true);
    }, 600);
    // console.log("cross");
  };
  const routeLogin = () => {
    navigate("/login");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userData");
    navigate("/login");
  };
  // const userData = JSON.parse(localStorage.getItem("userData"));
  //   if(userData){
  //     setLoggedUSer(userData.fullName);
  //   }
  //     console.log(loggedUSer);
  // let userData,username;
  const [username, setUsername] = useState("");
   const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.fullName) {
      setLoggedUSer(userData.fullName);
      setUserRole(userData.role);
       
      setUsername(userData.fullName);
      setTimeout(() => console.log(userData), 500);
    }
  }, []);
//  console.log(userRole);
  

  return (
    <>
      {arrow ? (
        <div className="open" onClick={(e) => dropClicked(e)}>
          <KeyboardDoubleArrowRightIcon style={{ fontSize: 50 }} />
        </div>
      ) : (
        ""
      )}

      <div className={drop ? "dashboard-Drop" : "dashboard-container"}>
        <div className="dashboard-wrapper">
          <div className="dashboard-top">
              <div className="dashboard-logo">
                <img
                  src={"/images/logoBlack1.png"}
                  alt="Logo"
                  style={{ height: "58px", width: "70px" }}
                />
              </div>
              <div className="dashboard-title">ATTENDIFY</div>
      
            {/* <div
              className="dashboard-dropdown"
              onClick={(e) => {
                setTimeout(() => {
                  crossClicked(e);
                }, 700);
              }}
            >
              <KeyboardDoubleArrowLeftIcon style={{ fontSize: 30 }} />
            </div> */}
          </div>
          <div className="dashboard-line"></div>
          <div className="dashboard-center">
            <div className="dashboard-menu">
              <div className="dashboard-icon">
                <HomeIcon />
              </div>
              <div className="dashboard-menu-data"><Link to="/" style={{ textDecoration: 'none', color: '#140E32' }}>Home</Link></div>
            </div>
            <div className="dashboard-menu">
              <div className="dashboard-icon">
                <AddAPhotoIcon />
              </div>
              <div className="dashboard-menu-data"><Link to="/TakeAttendance" style={{ textDecoration: 'none', color: '#140E32' }}>Take Attendance</Link></div>
            </div>
            <div className="dashboard-menu">
              <div className="dashboard-icon">
                <ReceiptLongIcon />
              </div>
              <div className="dashboard-menu-data"><Link to="/logAdmin" style={{ textDecoration: 'none', color: '#140E32' }}>Attendance Log</Link></div>
            </div>
            <div className={userRole?.toLowerCase().includes("student")?"hidden":"dashboard-menu"}>
              <div className="dashboard-icon">
                <PersonAddAltIcon />
              </div>
              <div className="dashboard-menu-data"><Link to="/addNewUser" style={{ textDecoration: 'none', color: '#140E32' }}>Add New User</Link></div>
            </div>
          </div>
        </div>
        <div className="dashboard-bottom">
          {/* <div className="dashboard-profile">
            <div className="dashboard-profile-image">
              <img
                src={"/images/lady.png"}
                alt="Logo"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="dashboard-profile-username">
              <p>{loggedUser || "Fullname"}</p>
            </div>
          </div> */}
          {/* <Link></Link> */}
          <div className="dashboard-logout" onClick={(e) => handleLogout(e)}>
            <LoginOutlinedIcon/> LogOut
          </div>
          {/* <button className="dashboard-logout">
            <a href="./Login">
              <i class="fa-solid fa-arrow-right-from-bracket"></i> LogOut
            </a>
          </button> */}
          {/* <button className="dashboard-logout"><Link to="../Login"><i class="fa-solid fa-arrow-right-from-bracket"></i> LogOut</Link></button> */}
          {/* <Link to="../Login" className="dashboard-logout"><i class="fa-solid fa-arrow-right-from-bracket"></i>LogOut</Link> */}
          {/* <div style={{color:"black"}}>{username}, {userRole}</div> */}
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
