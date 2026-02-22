import { useState } from "react";
import { registerUser, loginUser } from "../../services/auth";
import Modal from "./Model";
import { useAuth } from "../../context/AuthContext";
import "./AuthModel.css";

export default function RegisterModal({ onClose }) {
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleRegister = async () => {
    setStatus({ loading: true, error: "", success: "" });

    try {

      await registerUser(form);

      const userData = await loginUser({ username: form.username, password: form.password });

      login(userData.accessToken, {
        username: userData.username,
        role: userData.role,
      });

      onClose();

    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || "Registration failed",
        success: "",
      });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title">Register</h2>

      <div className="modal-group">
        <label>Username</label>
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>

      <div className="modal-group">
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="modal-group">
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {status.error && <p className="error-text">{status.error}</p>}
      {status.success && <p className="success-text">{status.success}</p>}

      <button onClick={handleRegister} disabled={status.loading} className="submit-btn">
        {status.loading ? "Registering..." : "Register"}
      </button>
    </Modal>
  );
}
