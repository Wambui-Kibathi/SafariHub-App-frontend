import { useState } from "react";
import { uploadProfilePicture } from "../api/uploadApi";
import { useAuth } from "../context/AuthContext";

const ProfilePictureUpload = ({ onUpload }) => {
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const imageUrl = await uploadProfilePicture(file, auth.token);
      setMessage("Upload successful!");
      onUpload(imageUrl);
    } catch {
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ProfilePictureUpload;