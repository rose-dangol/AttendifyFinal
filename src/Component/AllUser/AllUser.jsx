import React, { useEffect, useState } from "react";
import "./AllUSer.css";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/user/getAll");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  const HandleDelete=async(id)=>{
    if (!window.confirm("Are you sure you want to delete this user?")) return;
      try{
        // const result=await axios.delete(`http://localhost:5000/user/${._id}`);
      }catch(err){
        alert("Error deleting the user")
      }
    
    
  //   try{
  //     await axios.delete(`http://localhost:5000/user/${id}`);
  //     setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  //   }catch(err){
  //     console.error("Error deleting user:", err);
  //   }
  }
  // console.log(users);
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>RegisterDate</th>
            <th>Present Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>{user._id}</td>
                <td>
                  <span>{user.username}</span>
                </td>
                <td>{new Date(user.createdAt).toISOString().split("T")[0]}</td>
                <td>
                  <span>90%</span>
                </td>
                <td>
                  <button onClick={()=> HandleDelete(user._id)}
                    style={{
                      backgroundColor: "#E83F34",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      border:"1px",
                      padding:"5px",
                      width:"75px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
