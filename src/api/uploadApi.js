import { API_BASE_URL } from "./config";

export const uploadProfilePicture = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/upload/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Image upload failed");
    return data; // { image_url: "..." }
  } catch (error) {
    console.error("uploadProfilePicture error:", error);
    throw error;
  }
};