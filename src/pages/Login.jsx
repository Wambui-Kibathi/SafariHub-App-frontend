import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignInAlt, FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import "../styles/Form.css";
import "../styles/main.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user } = await login(formData);

      // Redirect by role
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "guide") navigate("/guide/dashboard");
      else navigate("/"); // traveler

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2><FaSignInAlt className="icon" /> Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="show-pass-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <><FaEyeSlash className="icon-small" /> Hide</> : <><FaEye className="icon-small" /> Show</>}
          </button>
        </div>
        <button type="submit" className="btn btn-primary"><FaSignInAlt className="icon-small" /> Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="redirect">
        Don't have an account? <Link to="/register"><FaUserPlus className="icon-small" /> Register here</Link>
      </p>
    </div>
  );
};

export default Login;
