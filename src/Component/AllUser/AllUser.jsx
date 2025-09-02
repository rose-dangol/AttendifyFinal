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
  console.log(users);
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>RegisterDate</th>
            <th>Present Rate</th>
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
                <td>{new Date(user.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <span>90%</span>
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
