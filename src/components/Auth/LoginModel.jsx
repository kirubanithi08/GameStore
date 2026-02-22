import { useState } from "react";
import Modal from "./Model";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import "../Auth/AuthModel.css";

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleLogin = async () => {
    setStatus({ loading: true, error: "" });

    try {
      const userData = await loginUser(form);

      login(userData.accessToken, {
        username: userData.username,
        role: userData.role
      });


      onClose();
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title">Login</h2>

      <div className="modal-group">
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter email"
        />
      </div>

      <div className="modal-group">
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Enter password"
        />
      </div>

      {status.error && <p className="error-text">{status.error}</p>}

      <button
        className="submit-btn"
        onClick={handleLogin}
        disabled={status.loading}
      >
        {status.loading ? "Logging in..." : "Login"}
      </button>
    </Modal>
  );
}
