import { API_BASE_URL } from "./config";

// Guide dashboard overview
export const getGuideDashboard = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch guide dashboard");
  return data; // { guide, total_bookings }
};

// Guide profile
export const getGuideProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
  return data;
};

export const updateGuideProfile = async (payload, token) => {
  const res = await fetch(`${API_BASE_URL}/guide/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};

// Guide destinations
export const getAssignedDestinations = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/destinations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch destinations");
  return data;
};

// Guide bookings
export const getGuideBookings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
  return data;
};
