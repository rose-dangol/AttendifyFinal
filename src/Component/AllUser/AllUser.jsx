import React, { useEffect, useState } from "react";
import "./AllUSer.css";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [updatingUser, setupdatingUser]= useState(null);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/user/getAll");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  const HandleDelete=async(id)=>{
    console.log(id, "id")
    if (!window.confirm("Are you sure you want to delete this user?")) return;
      try{
        const result=await axios.delete(`http://localhost:5000/user/${id}`);
        
      }catch(err){
        console.error(err, "error")
        alert("Error deleting the user")
      }
  }
  const openUpdateForm = (user) =>{
    setupdatingUser(user._id);
    setFormData({
      fullName: user.fullName,
      email: user.email,
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleUpdate=async(id)=>{
    try{
        const res = await axios.put(`http://localhost:5000/user/${id}`,formData);
        alert(res.data.message);
        console.log(res.data.user);
        setupdatingUser(null);
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
                  {/* <button onClick={()=> openUpdateForm(user)}
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
                  {updatingUser === user._id &&(
                    <div style={{marginTop:"10px"}}>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name"></input>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                      <button onClick={()=> HandleUpdate(user._id)}>Save</button>
                      <button>Cancle</button>
                    </div>
                  )}             */}
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
