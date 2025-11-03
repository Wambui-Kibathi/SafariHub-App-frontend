import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getUsers,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getAllDestinations
} from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaTrashAlt, FaChartBar } from "react-icons/fa";  // Added icons
import "../../styles/dashboard.css";

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const [dashboard, setDashboard] = useState({ total_users: 0, total_bookings: 0, total_destinations: 0 });
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState({ user: null, booking: null });

  console.log("AdminDashboard - Rendering with:", { token: token ? "exists" : "missing", user });

  useEffect(() => {
    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("AdminDashboard - Fetching data with token:", token ? "exists" : "missing");
        
        // Fetch actual data from APIs
        let dashData = { total_users: 0, total_bookings: 0, total_destinations: 0 };
        let usersData = [];
        let bookingsData = [];
        let destData = [];
        
        try {
          dashData = await getAdminDashboard(token);
          console.log("Dashboard stats loaded:", dashData);
        } catch (err) {
          console.warn("Dashboard stats failed:", err.message);
        }
        
        try {
          usersData = await getUsers(token);
          console.log("Users loaded:", usersData);
        } catch (err) {
          console.warn("Users data failed:", err.message);
        }
        
        try {
          bookingsData = await getAllBookings(token);
          console.log("Bookings loaded:", bookingsData);
        } catch (err) {
          console.warn("Bookings data failed:", err.message);
        }
        
        try {
          destData = await getAllDestinations(token);
          console.log("Destinations loaded:", destData);
        } catch (err) {
          console.warn("Destinations data failed:", err.message);
        }
        
        setDashboard(dashData);
        setUsers(usersData);
        setBookings(bookingsData);
        setDestinations(destData);
        setError("");
      } catch (err) {
        console.error("AdminDashboard - Error:", err);
        setError(`Failed to load data: ${err.message}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setDeleting({ ...deleting, user: id });
      await deleteUser(id, token);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting({ ...deleting, user: null });
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      setDeleting({ ...deleting, booking: id });
      await deleteBooking(id, token);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting({ ...deleting, booking: null });
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h1><FaChartBar className="icon" /> Admin Dashboard</h1>
        <div className="loading-spinner">Loading admin dashboard...</div>
        
        {/* Show basic dashboard even while loading */}
        <div className="stats-grid">
          <div className="stat-card">
            <FaUsers className="icon" />
            <h3>Total Users</h3>
            <p>Loading...</p>
          </div>
          <div className="stat-card">
            <FaCalendarAlt className="icon" />
            <h3>Total Bookings</h3>
            <p>Loading...</p>
          </div>
          <div className="stat-card">
            <FaMapMarkerAlt className="icon" />
            <h3>Total Destinations</h3>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1><FaChartBar className="icon" /> Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}

      {/* Stats Grid - Enhanced as cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaUsers className="icon" />
          <h3>Total Users</h3>
          <p>{dashboard?.total_users || users?.length || 0}</p>
        </div>
        <div className="stat-card">
          <FaCalendarAlt className="icon" />
          <h3>Total Bookings</h3>
          <p>{dashboard?.total_bookings || bookings?.length || 0}</p>
        </div>
        <div className="stat-card">
          <FaMapMarkerAlt className="icon" />
          <h3>Total Destinations</h3>
          <p>{dashboard?.total_destinations || destinations?.length || 0}</p>
        </div>
      </div>

      {/* Users Section */}
      <section className="users-section">
        <h2><FaUsers className="icon" /> Users ({users?.length || 0})</h2>
        {!users || users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.full_name || 'N/A'}</td>
                    <td>{u.email || 'N/A'}</td>
                    <td>{u.role || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        disabled={deleting.user === u.id}
                        className="delete-btn"
                      >
                        <FaTrashAlt className="icon-small" /> {deleting.user === u.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Bookings Section */}
      <section className="bookings-section">
        <h2><FaCalendarAlt className="icon" /> Bookings ({bookings?.length || 0})</h2>
        {!bookings || bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Traveler ID</th>
                  <th><FaMapMarkerAlt className="icon-small" /> Destination ID</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Total Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.traveler_id || 'N/A'}</td>
                    <td>{b.destination_id || 'N/A'}</td>
                    <td>{b.start_date ? new Date(b.start_date).toLocaleDateString() : 'N/A'}</td>
                    <td>{b.end_date ? new Date(b.end_date).toLocaleDateString() : 'N/A'}</td>
                    <td>${b.total_cost || 0}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        disabled={deleting.booking === b.id}
                        className="delete-btn"
                      >
                        <FaTrashAlt className="icon-small" /> {deleting.booking === b.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Destinations Section */}
      <section className="destinations-section">
        <h2><FaMapMarkerAlt className="icon" /> Destinations ({destinations?.length || 0})</h2>
        {!destinations || destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          <ul className="destinations-list">
            {destinations.map(d => (
              <li key={d.id} className="destination-item">
                <FaMapMarkerAlt className="icon-small" /> {d.name || 'N/A'} ({d.country || 'N/A'}) - ${d.price || 0}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;