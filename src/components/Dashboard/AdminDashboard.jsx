import React, { useState, useEffect } from "react";
import GameForm from "./GameForm";
import * as userService from "../../services/userService";
import { useToast } from "../../context/ToastContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      setError("");
      try {
        const extractedUsers = await userService.fetchUsers();
        setUsers(extractedUsers);
      } catch (err) {
        console.error("User fetch failed:", err);
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this user?")) return;

    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      addToast("User deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      addToast("Failed to delete user", "error");
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage) || 1;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="dashboard-wrapper">
      <div className="upperBox">
        <div className="dashboard-header">
          <h1>Management Portal</h1>
          <button className="create-btn" onClick={() => setShowForm(true)}>
            + Add New Game
          </button>
        </div>
      </div>

      {showForm && <GameForm onClose={() => setShowForm(false)} />}

      <div className="user-list">
        <div className="section-header">
          <h2>Registered Users</h2>
          <p>Manage community members and permissions</p>
        </div>

        {loadingUsers ? (
          <div className="loader-container">
            <div className="pulse-loader"></div>
            <p>Retrieving user data...</p>
          </div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : (
          <>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-state">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info-cell">
                            <span className="username-text">{user.username}</span>
                          </div>
                        </td>
                        <td>
                          <span className="email-text">{user.email || "N/A"}</span>
                        </td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role?.replace("ROLE_", "")}
                          </span>
                        </td>
                        <td>
                          <button
                            className="delete-action-btn"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span className="page-indicator">
                {currentPage} / {totalPages}
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
