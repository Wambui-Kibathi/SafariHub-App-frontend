import { API_BASE_URL } from "./config";

// Create a new review
export const addReview = async (token, reviewData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to post review");
    return data;
  } catch (error) {
    console.error("addReview error:", error);
    throw error;
  }
};

// Get all reviews for a destination
export const getReviews = async (destinationId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/destination/${destinationId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch reviews");
    return data;
  } catch (error) {
    console.error("getReviews error:", error);
    throw error;
  }
};
