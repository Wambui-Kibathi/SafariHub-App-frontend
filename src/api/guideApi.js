import { API_BASE_URL } from "./config";

// Guide profile
export const getGuideProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch guide profile");
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
  if (!res.ok) throw new Error(data.message || "Failed to update guide profile");
  return data;
};

// Guide bookings
export const getGuideBookings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch guide bookings");
  return data;
};

export const updateBookingStatus = async (id, status, token) => {
  const res = await fetch(`${API_BASE_URL}/guide/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update booking status");
  return data;
};

// Guide dashboard
export const getGuideDashboard = async (token) => {
  const res = await fetch(`${API_BASE_URL}/guide/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch guide dashboard");
  return data;
};