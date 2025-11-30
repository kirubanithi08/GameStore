import { useState } from "react";
import Modal from "./Model";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../Context/AuthContext";
import "../Auth/AuthModel.css";

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleLogin = async () => {
    setStatus({ loading: true, error: "" });

    try {
      const { data } = await loginUser(form);

      // call global login function
      // login(data.accessToken, {
      //   username: data.username,
      //   role: data.role,
      // });

      login(data.accessToken, {
  username: data.username,
  role: data.role?.toUpperCase()      // Ensures "ROLE_ADMIN"
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
        <label>Username</label>
        <input
          type="text"
          value={form.username}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder="Enter username"
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
