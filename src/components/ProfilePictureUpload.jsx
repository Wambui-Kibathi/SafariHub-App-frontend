import { useState } from "react";
import { uploadProfilePicture } from "../api/uploadApi";
import { useAuth } from "../context/AuthContext";

const ProfilePictureUpload = ({ onUpload }) => {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadProfilePicture(file, token);
      setMessage("Upload successful!");
      onUpload(result.image_url);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {preview && (
        <div style={{ margin: "10px 0" }}>
          <img src={preview} alt="Preview" width="100" style={{ borderRadius: "5px" }} />
        </div>
      )}
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange} 
        />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ProfilePictureUpload;