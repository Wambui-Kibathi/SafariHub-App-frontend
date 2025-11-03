import { API_BASE_URL } from "./config";

// Traveler profile
export const getTravelerProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/traveler/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Profile API Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch profile (${res.status})`);
  }
  const data = await res.json();
  return data;
};

export const updateTravelerProfile = async (payload, token) => {
  const res = await fetch(`${API_BASE_URL}/traveler/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Traveler Profile Update Error ${res.status}:`, errorText);
    throw new Error(`Failed to update profile (${res.status})`);
  }
  const data = await res.json();
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