import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getGuideDashboard,
  getGuideProfile,
  getAssignedDestinations,
  getGuideBookings,
  updateGuideProfile
} from "../../api/guideApi";
import { updateBookingStatus } from "../../api/bookingApi";
import { FaUser, FaChartBar, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard } from "react-icons/fa";  // Added icons
import "../../styles/dashboard.css";

const GuideDashboard = () => {
  const authContext = useAuth();
  const auth = authContext?.auth || {};
  const [profile, setProfile] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    if (!auth || !auth.token) {
      console.log("No auth token, using demo mode");
      setDashboard({ total_bookings: 0 });
      setProfile({ full_name: "Demo Guide", email: "demo@guide.com" });
      setEditProfile({ full_name: "Demo Guide", email: "demo@guide.com" });
      setDestinations([]);
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch data with fallbacks
        let dashData = { total_bookings: 0 };
        let profileData = { full_name: "Guide", email: "guide@example.com" };
        let destData = [];
        let bookingsData = [];
        
        try {
          dashData = await getGuideDashboard(auth.token);
        } catch (err) {
          console.log("Dashboard API not available:", err.message);
        }
        
        try {
          profileData = await getGuideProfile(auth.token);
        } catch (err) {
          console.log("Profile API not available:", err.message);
        }
        
        try {
          destData = await getAssignedDestinations(auth.token);
        } catch (err) {
          console.log("Destinations API not available:", err.message);
        }
        
        try {
          bookingsData = await getGuideBookings(auth.token);
        } catch (err) {
          console.log("Bookings API not available:", err.message);
        }

        setDashboard(dashData);
        setProfile(profileData);
        setEditProfile(profileData);
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
  }, [auth?.token]);

  const handleBookingStatus = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, { status }, auth?.token);
      // Update local state immediately
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? {...b, status} : b
      ));
    } catch (err) {
      setError(`Failed to update booking: ${err.message}`);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateGuideProfile(editProfile, auth?.token);
      setProfile(editProfile);
      setEditMode(false);
      setError("");
    } catch (err) {
      setError(`Failed to update profile: ${err.message}`);
    }
  };

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
        {!editMode ? (
          <div className="profile-info">
            <p><strong>Name:</strong> {profile.full_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            {profile.profile_pic && (
              <img src={profile.profile_pic} alt="Profile" className="profile-pic" />
            )}
            <button onClick={() => setEditMode(true)} className="btn-edit">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <input
              type="text"
              value={editProfile.full_name}
              onChange={(e) => setEditProfile({...editProfile, full_name: e.target.value})}
              placeholder="Full Name"
            />
            <input
              type="email"
              value={editProfile.email}
              onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
              placeholder="Email"
            />
            <div className="form-actions">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" onClick={() => setEditMode(false)} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Overview Section */}
      <section className="overview-card">
        <h2><FaChartBar className="icon" /> Overview</h2>
        <p><strong>Total Bookings:</strong> {dashboard.total_bookings}</p>
      </section>

      {/* Assigned Destinations Section */}
      <section className="destinations-section">
        <h2><FaMapMarkerAlt className="icon" /> Assigned Destinations</h2>
        <ul className="destinations-list">
          {destinations.map(d => (
            <li key={d.id} className="destination-item">
              <FaMapMarkerAlt className="icon-small" /> {d.name} ({d.country}) - ${d.price}
            </li>
          ))}
        </ul>
      </section>

      {/* Bookings Section */}
      <section className="bookings-section">
        <h2><FaCalendarAlt className="icon" /> Bookings for My Destinations</h2>
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
                <th>Actions</th>
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
                  <td>
                    <button 
                      onClick={() => handleBookingStatus(b.id, "confirmed")}
                      className="btn-confirm"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => handleBookingStatus(b.id, "cancelled")}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default GuideDashboard;