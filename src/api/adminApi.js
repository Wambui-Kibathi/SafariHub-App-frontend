import { API_BASE_URL } from "./config";

// Dashboard overview
export const getAdminDashboard = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Admin Dashboard Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch dashboard (${res.status})`);
  }
  const data = await res.json();
  return data;
};

// Users
export const getUsers = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Get Users Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch users (${res.status})`);
  }
  const data = await res.json();
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
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Get Bookings Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch bookings (${res.status})`);
  }
  const data = await res.json();
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
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Get Destinations Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch destinations (${res.status})`);
  }
  const data = await res.json();
  return data;
};

// Admin Profile
export const getAdminProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/admin/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Admin Profile API Error ${res.status}:`, errorText);
    throw new Error(`Failed to fetch admin profile (${res.status})`);
  }
  const data = await res.json();
  return data;
};

export const updateAdminProfile = async (payload, token) => {
  const res = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Admin Profile Update Error ${res.status}:`, errorText);
    throw new Error(`Failed to update admin profile (${res.status})`);
  }
  const data = await res.json();
  return data;
};