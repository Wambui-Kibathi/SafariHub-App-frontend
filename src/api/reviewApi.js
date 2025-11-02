import { API_BASE_URL } from "./config";

// Get reviews for a destination
export const getDestinationReviews = async (destinationId) => {
  const res = await fetch(`${API_BASE_URL}/destinations/${destinationId}/reviews`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch reviews");
  return data;
};

// Create a review
export const createReview = async (destinationId, payload, token) => {
  const res = await fetch(`${API_BASE_URL}/destinations/${destinationId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create review");
  return data;
};

// Update a review
export const updateReview = async (reviewId, payload, token) => {
  const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update review");
  return data;
};

// Delete a review
export const deleteReview = async (reviewId, token) => {
  const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete review");
  return data;
};