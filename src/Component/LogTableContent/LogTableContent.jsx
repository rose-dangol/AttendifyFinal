import React from "react";
import "./LogTableContent.css";
const LogTableContent = ({ user }) => {
  console.log(user);
  return (
    <>
      {user && user.length > 0 ? (
        user.map((u) => (
          <tr key={u?.userId?._id}>
            <td>{u?.userId?.username}</td>
            <td>
              <span className="log-role">{u?.userId?.role}</span>
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
    </>
  );
};

export default LogTableContent;
