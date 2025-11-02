import { API_BASE_URL } from "./config";

// Create a new booking
export const createBooking = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Booking failed");
  return result;
};

// Get bookings for a user
export const getUserBookings = async (userId, token) => {
  const res = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
  return data;
};

// Get booking by ID
export const getBookingById = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch booking");
  return data;
};

// Update booking
export const updateBooking = async (id, data, token) => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to update booking");
  return result;
};

// Delete booking
export const deleteBooking = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to delete booking");
  return result;
};