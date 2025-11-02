import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserPlus, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import "../styles/Form.css";
import "../styles/main.css";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "traveler",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user } = await register(formData);

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
      <h2><FaUserPlus className="icon" /> Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
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
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="traveler">Traveler</option>
          <option value="guide">Guide</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary"><FaUserPlus className="icon-small" /> Register</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="redirect">
        Already have an account? <Link to="/login"><FaSignInAlt className="icon-small" /> Login here</Link>
      </p>
    </div>
  );
};

export default Register;
