import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTravelerProfile, getTravelerBookings, updateTravelerProfile } from "../../api/travelerApi";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaCreditCard, FaEdit, FaSave, FaTimes } from "react-icons/fa";  
import "../../styles/dashboard.css";  

const TravelerDashboard = () => {
  const { token, user } = useAuth();
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [saveMessage, setSaveMessage] = useState("");

  console.log("TravelerDashboard - Auth state:", { token: token ? "exists" : "missing", user });

  useEffect(() => {
    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("TravelerDashboard - Fetching data...");
        setLoading(true);
        const profileData = await getTravelerProfile(token);
        const bookingsData = await getTravelerBookings(token);
        console.log("TravelerDashboard - Data received:", { profileData, bookingsData });
        setProfile(profileData);
        setEditedProfile(profileData);
        setBookings(bookingsData);
        setError("");
      } catch (err) {
        console.error("TravelerDashboard - Error:", err);
        setError(`Failed to load data: ${err.message}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = await updateTravelerProfile(editedProfile, token);
      setProfile(updatedProfile);
      setIsEditing(false);
      setSaveMessage("Profile updated successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      console.error("Save profile error:", err);
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setSaveMessage("");
  };

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2><FaUser className="icon" /> Profile</h2>
          <div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                <FaEdit className="icon-small" /> Edit Profile
              </button>
            ) : (
              <div>
                <button onClick={handleSaveProfile} className="save-btn" style={{ marginRight: "10px" }}>
                  <FaSave className="icon-small" /> Save
                </button>
                <button onClick={handleCancelEdit} className="cancel-btn">
                  <FaTimes className="icon-small" /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-info">
          {profile.profile_pic && (
            <img src={profile.profile_pic} alt="Profile" className="profile-pic" width="80" style={{ borderRadius: "50%", marginBottom: "10px" }} />  
          )}
          
          {!isEditing ? (
            <>
              <p><strong>Name:</strong> {profile.full_name || user?.full_name || "N/A"}</p>
              <p><strong>Email:</strong> {profile.email || user?.email || "N/A"}</p>
              <p><strong>Role:</strong> {profile.role || user?.role || "traveler"}</p>
              <p><strong>Member Since:</strong> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}</p>
            </>
          ) : (
            <div className="edit-form">
              <div style={{ marginBottom: "10px" }}>
                <label><strong>Name:</strong></label>
                <input
                  type="text"
                  value={editedProfile.full_name || ""}
                  onChange={(e) => setEditedProfile({...editedProfile, full_name: e.target.value})}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label><strong>Email:</strong></label>
                <input
                  type="email"
                  value={editedProfile.email || ""}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </div>
              <p><strong>Role:</strong> {profile.role || user?.role || "traveler"}</p>
              <p><strong>Member Since:</strong> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}</p>
            </div>
          )}
        </div>
        
        {saveMessage && <p className="success" style={{ marginTop: "10px" }}>{saveMessage}</p>}
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