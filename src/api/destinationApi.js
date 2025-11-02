import { API_BASE_URL } from "./config";

// Get all destinations
export const getDestinations = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/destinations/`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch destinations");
    return data;
  } catch (error) {
    console.error("getDestinations error:", error);
    throw error;
  }
};

// Get single destination by ID
export const getDestinationById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/destinations/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch destination");
    return data;
  } catch (error) {
    console.error("getDestinationById error:", error);
    throw error;
  }
};

// ADMIN - Create destination
export const createDestination = async (payload, token) => {
  const res = await fetch(`${API_BASE_URL}/destinations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create destination");
  return data;
};

// ADMIN - Update destination
export const updateDestination = async (id, payload, token) => {
  const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update destination");
  return data;
};

// ADMIN - Delete destination
export const deleteDestination = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete destination");
  return data;
};
