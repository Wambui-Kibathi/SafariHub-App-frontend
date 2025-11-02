import { API_BASE_URL } from "./config";

// Traveler profile
export const getTravelerProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/traveler/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
  return data;
};

export const updateTravelerProfile = async (payload, token) => {
  const res = await fetch(`${API_BASE_URL}/traveler/profile`, {
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

// Traveler bookings
export const getTravelerBookings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/traveler/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
  return data;
};