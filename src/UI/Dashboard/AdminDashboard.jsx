import React, { useState, useEffect } from "react";
import GameForm from "./GameForm";
import api from "../../api/axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

 
  useEffect(() => {
    setLoadingUsers(true);
    api
      .get("/user")
      .then((res) => {
        console.log("Users API Response:", res.data);
        setUsers(res.data.content || []); 
      })
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoadingUsers(false));
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage) || 1;

  return (
    <div className="dashboard-container">
     
      <div className="upperBox">
        <button className="create-btn" onClick={() => setShowForm(true)}>
          + Create Game
        </button>
      </div>

      
      {showForm && <GameForm onClose={() => setShowForm(false)} />}

      
      <div className="user-list">
        <h2>Users</h2>

        {loadingUsers ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="error-box">{error}</p>
        ) : (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
