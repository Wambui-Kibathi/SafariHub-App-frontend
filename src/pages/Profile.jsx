import { useEffect, useState } from "react";
import { getTravelerProfile, updateTravelerProfile } from "../api/travelerApi";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaSave } from "react-icons/fa";
import "../styles/form.css";

const Profile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getTravelerProfile(auth.token);
      setProfile(data);
    };
    fetchProfile();
  }, [auth.token]);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await updateTravelerProfile(profile, auth.token);
    setMessage("Profile updated successfully!");
  };

  const handlePictureUpdate = (url) => {
    setProfile({ ...profile, profile_pic: url });
  };

  return (
    <div className="form-container">
      <h2><FaUser className="icon" /> My Profile</h2>
      {profile ? (
        <>
          <img
            src={profile.profile_pic || "/default-avatar.png"}
            alt="Profile"
            width="100"
          />
          <ProfilePictureUpload onUpload={handlePictureUpdate} />

          <label>Full Name</label>
          <input
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
          />
          <button onClick={handleSave}><FaSave className="icon-small" /> Save Changes</button>
          {message && <p className="success">{message}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
