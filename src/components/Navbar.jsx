import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/main.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate("/")}>
        SafariHub
      </h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>

        {/* Show dashboard link depending on role */}
        {user && user.role === "admin" && (
          <Link to="/dashboard/admin">Dashboard</Link>
        )}
        {user && user.role === "guide" && (
          <Link to="/dashboard/guide">Dashboard</Link>
        )}
        {user && user.role === "traveler" && (
          <Link to="/dashboard/traveler">Dashboard</Link>
        )}

        {/* If logged in, show profile + logout */}
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
