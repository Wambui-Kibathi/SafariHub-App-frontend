import { API_BASE_URL } from "./config";

// Dashboard overview
export const getAdminDashboard = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard");
  return data; // { total_users, total_bookings, total_destinations }
};

// Users
export const getUsers = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

export const updateUser = async (id, payload, token) => {
  const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update user");
  return data;
};

export const deleteUser = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete user");
  return data;
};

// Bookings
export const getAllBookings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
  return data;
};

export const deleteBooking = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete booking");
  return data;
};

// Destinations
export const getAllDestinations = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/destinations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch destinations");
  return data;
};