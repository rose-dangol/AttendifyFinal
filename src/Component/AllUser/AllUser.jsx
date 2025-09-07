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
  }
  const HandleUpdate=async(id)=>{
    try{
        const res = await axios.put(`http://localhost:5000/user/${id}`, {
          fullName: "",
          email: "",
      });
      }catch(err){
        alert("Error updating the user")
    }
  }
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>FullName</th>
            <th>Username</th>
            <th>Email Address</th>
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
                <td>{user.fullName}</td>
                <td>
                  <span>{user.username}</span>
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toISOString().split("T")[0]}</td>
                <td>
                  <span>{user.presentCount}</span>
                </td>
                <td className="action-btns">
                  <button onClick={()=> HandleDelete(user._id)}
                    style={{
                      backgroundColor: "#C93C33",
                      color:"white",
                      justifyContent: "center",
                      alignItems: "center",
                      // borderRadius: "8px",
                      border:"1px",
                      padding:"5px",
                      width:"75px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={()=> HandleUpdate(user._id)}
                    style={{
                      backgroundColor: "white",
                      color:"#C93C33",
                      justifyContent: "center",
                      alignItems: "center",
                      // borderRadius: "8px",
                      border:"1px solid #C93C33",
                      padding:"5px",
                      width:"75px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  > Update
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
