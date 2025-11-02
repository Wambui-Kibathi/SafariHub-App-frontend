import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getGuideDashboard,
  getGuideProfile,
  getAssignedDestinations,
  getGuideBookings
} from "../../api/guideApi";
import { FaUser, FaChartBar, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard } from "react-icons/fa";  // Added icons
import "../../styles/dashboard.css";

const GuideDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth.token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const dashData = await getGuideDashboard(auth.token);
        const profileData = await getGuideProfile(auth.token);
        const destData = await getAssignedDestinations(auth.token);
        const bookingsData = await getGuideBookings(auth.token);

        setDashboard(dashData);
        setProfile(profileData);
        setDestinations(destData);
        setBookings(bookingsData);
        setError(""); 
      } catch (err) {
        setError(`Failed to load data: ${err.message}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth.token]);

  if (loading) {
    return (
      <div className="guide-dashboard">
        <div className="loading-spinner">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="guide-dashboard">
      <h1><FaUser className="icon" /> Guide Dashboard</h1>
      {error && <p className="error">{error}</p>}

      {/* Profile Section */}
      <section className="profile-card">
        <h2><FaUser className="icon" /> Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.full_name || "N/A"}</p>
          <p><strong>Email:</strong> {profile.email || "N/A"}</p>
          {profile.profile_pic && (
            <img src={profile.profile_pic} alt="Profile" className="profile-pic" />
          )}
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-card">
        <h2><FaChartBar className="icon" /> Overview</h2>
        <p><strong>Total Bookings:</strong> {dashboard.total_bookings || 0}</p>
      </section>

      {/* Assigned Destinations Section */}
      <section className="destinations-section">
        <h2><FaMapMarkerAlt className="icon" /> Assigned Destinations</h2>
        {destinations.length === 0 ? (
          <p>No assigned destinations yet.</p>
        ) : (
          <ul className="destinations-list">
            {destinations.map(d => (
              <li key={d.id} className="destination-item">
                <FaMapMarkerAlt className="icon-small" /> {d.name} ({d.country}) - ${d.price}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bookings Section */}
      <section className="bookings-section">
        <h2><FaCalendarAlt className="icon" /> Bookings for My Destinations</h2>
        {bookings.length === 0 ? (
          <p>No bookings found for your destinations.</p>
        ) : (
          <div className="bookings-table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Traveler ID</th>
                  <th><FaMapMarkerAlt className="icon-small" /> Destination ID</th>
                  <th><FaCalendarAlt className="icon-small" /> Start Date</th>
                  <th><FaCalendarAlt className="icon-small" /> End Date</th>
                  <th><FaCreditCard className="icon-small" /> Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.traveler_id}</td>
                    <td>{b.destination_id}</td>
                    <td>{new Date(b.start_date).toLocaleDateString()}</td>
                    <td>{new Date(b.end_date).toLocaleDateString()}</td>
                    <td>${b.total_cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default GuideDashboard;