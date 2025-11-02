import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaMapMarkerAlt, FaUser, FaChartBar, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
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
        <Link to="/"><FaHome className="icon-small" /> Home</Link>
        <Link to="/destinations"><FaMapMarkerAlt className="icon-small" /> Destinations</Link>

        {/* Show dashboard link depending on role */}
        {user && user.role === "admin" && (
          <Link to="/dashboard/admin"><FaChartBar className="icon-small" /> Dashboard</Link>
        )}
        {user && user.role === "guide" && (
          <Link to="/dashboard/guide"><FaChartBar className="icon-small" /> Dashboard</Link>
        )}
        {user && user.role === "traveler" && (
          <Link to="/dashboard/traveler"><FaChartBar className="icon-small" /> Dashboard</Link>
        )}

        {/* If logged in, show profile + logout */}
        {user ? (
          <>
            <Link to="/profile"><FaUser className="icon-small" /> Profile</Link>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="icon-small" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"><FaSignInAlt className="icon-small" /> Login</Link>
            <Link to="/register"><FaUserPlus className="icon-small" /> Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
