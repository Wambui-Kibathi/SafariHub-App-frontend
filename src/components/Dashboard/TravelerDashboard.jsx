import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTravelerProfile, getTravelerBookings } from "../../api/travelerApi";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";  
import "../../styles/dashboard.css";  

const TravelerDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});
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
        const profileData = await getTravelerProfile(auth.token);
        const bookingsData = await getTravelerBookings(auth.token);
        setProfile(profileData);
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
      <div className="traveler-dashboard">
        <div className="loading-spinner">Loading your dashboard...</div>  
      </div>
    );
  }

  return (
    <div className="traveler-dashboard">
      <h1><FaUser className="icon" /> Traveler Dashboard</h1>  
      {error && <p className="error">{error}</p>}

      {/* Profile Section - Styled as a card */}
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

      {/* Bookings Section */}
      <section className="bookings-section">
        <h2><FaCalendarAlt className="icon" /> My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found. <a href="/destinations">Book a trip now!</a></p>
        ) : (
          <div className="bookings-table-container">  
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th><FaMapMarkerAlt className="icon-small" /> Destination ID</th>
                  <th><FaCalendarAlt className="icon-small" /> Start Date</th>
                  <th><FaCalendarAlt className="icon-small" /> End Date</th>
                  <th><FaCreditCard className="icon-small" /> Total Cost</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.destination_id}</td>
                    <td>{new Date(b.start_date).toLocaleDateString()}</td>  
                    <td>{new Date(b.end_date).toLocaleDateString()}</td>
                    <td>${b.total_cost}</td>
                    <td className={b.is_paid ? "paid-yes" : "paid-no"}>{b.is_paid ? "Yes" : "No"}</td>  
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

export default TravelerDashboard;