import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTravelerProfile, updateTravelerProfile } from "../api/travelerApi";
import { getAdminProfile, updateAdminProfile } from "../api/adminApi";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaSave, FaEdit, FaTimes } from "react-icons/fa";
import "../styles/form.css";

const Profile = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Auth state:", { 
      token: token ? `${token.substring(0, 20)}...` : "missing", 
      user,
      tokenLength: token?.length 
    });
    
    if (!token) {
      setError("No authentication token found");
      return;
    }
    
    // Wait for user data to load
    if (!user) {
      console.log("Waiting for user data to load...");
      return;
    }
    
    const fetchProfile = async () => {
      try {
        console.log("Making profile request for role:", user?.role);
        let data;
        if (user?.role === 'admin') {
          data = await getAdminProfile(token);
        } else {
          data = await getTravelerProfile(token);
        }
        console.log("Profile data received:", data);
        setProfile(data);
        setEditedProfile(data);
        setError("");
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      }
    };
    fetchProfile();
  }, [token, user]);

  const handleChange = (e) =>
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });

  const handleEdit = () => {
    setIsEditing(true);
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      let updatedProfile;
      if (user?.role === 'admin') {
        updatedProfile = await updateAdminProfile(editedProfile, token);
      } else {
        updatedProfile = await updateTravelerProfile(editedProfile, token);
      }
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
      setIsEditing(false);
      setMessage("Profile updated successfully!");
      
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePictureUpdate = (url) => {
    if (isEditing) {
      setEditedProfile({ ...editedProfile, profile_pic: url });
    } else {
      setProfile({ ...profile, profile_pic: url });
    }
  };

  if (!user) {
    return <div className="form-container"><p>Please log in to view your profile.</p></div>;
  }

  const currentProfile = isEditing ? editedProfile : profile;

  const renderProfileFields = () => {
    if (user?.role === 'admin') {
      return (
        <>
          <div className="field-group">
            <label>Full Name</label>
            {isEditing ? (
              <input
                name="full_name"
                value={currentProfile.full_name || user?.full_name || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentProfile.full_name || user?.full_name || "N/A"}</p>
            )}
          </div>

          <div className="field-group">
            <label>Email</label>
            {isEditing ? (
              <input
                name="email"
                type="email"
                value={currentProfile.email || user?.email || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentProfile.email || user?.email || "N/A"}</p>
            )}
          </div>

          <div className="field-group">
            <label>Phone</label>
            {isEditing ? (
              <input
                name="phone"
                value={currentProfile.phone || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentProfile.phone || "N/A"}</p>
            )}
          </div>

          <div className="field-group">
            <label>Department</label>
            {isEditing ? (
              <input
                name="department"
                value={currentProfile.department || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentProfile.department || "N/A"}</p>
            )}
          </div>

          <div className="field-group">
            <label>Role</label>
            <p>{currentProfile.role || "admin"}</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="field-group">
            <label>Full Name</label>
            {isEditing ? (
              <input
                name="full_name"
                value={currentProfile.full_name || user?.full_name || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentProfile.full_name || user?.full_name || "N/A"}</p>
            )}
          </div>

          <div className="field-group">
            <label>Email</label>
            {isEditing ? (
              <input
                name="email"
                type="email"
                value={currentProfile.email || user?.email || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{currentProfile.email || user?.email || "N/A"}</p>
            )}
          </div>

          <div className="field-group">
            <label>Role</label>
            <p>{currentProfile.role || "traveler"}</p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="form-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2><FaUser className="icon" /> {user?.role === 'admin' ? 'Admin' : 'My'} Profile</h2>
        <div>
          {!isEditing ? (
            <button onClick={handleEdit} className="btn btn-primary">
              <FaEdit className="icon-small" /> Edit Profile
            </button>
          ) : (
            <div>
              <button onClick={handleSave} className="btn btn-primary" style={{ marginRight: "10px" }}>
                <FaSave className="icon-small" /> Save
              </button>
              <button onClick={handleCancel} className="btn btn-secondary">
                <FaTimes className="icon-small" /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="error">Error: {error}</p>}
      {message && <p className="success">{message}</p>}
      
      {profile ? (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {currentProfile.profile_pic ? (
              <>
                <img
                  src={currentProfile.profile_pic}
                  alt="Profile"
                  width="100"
                  style={{ borderRadius: "50%" }}
                  onError={(e) => {
                    console.error("Profile image failed to load:", currentProfile.profile_pic);
                    e.target.src = "/default-avatar.png";
                  }}
                  onLoad={() => console.log("Profile image loaded:", currentProfile.profile_pic)}
                />
                <p style={{ fontSize: "12px", color: "#666" }}>Image URL: {currentProfile.profile_pic}</p>
              </>
            ) : (
              <>
                <img
                  src="/default-avatar.png"
                  alt="Default Profile"
                  width="100"
                  style={{ borderRadius: "50%" }}
                />
                <p style={{ fontSize: "12px", color: "#666" }}>No profile picture uploaded</p>
              </>
            )}
            {isEditing && <ProfilePictureUpload onUpload={handlePictureUpdate} />}
          </div>
          
          {renderProfileFields()}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
