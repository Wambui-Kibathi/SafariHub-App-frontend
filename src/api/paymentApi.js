import { API_BASE_URL } from "./config";

// Get all payments (Admin only)
export const getAllPayments = async (token) => {
  const res = await fetch(`${API_BASE_URL}/payments/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch payments");
  return data;
};

// Get a single payment
export const getPayment = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/payments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch payment");
  return data;
};

// Initialize a new payment (returns authorization_url)
export const initializePayment = async (bookingId, callbackUrl, token) => {
  const res = await fetch(`${API_BASE_URL}/payments/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ booking_id: bookingId, callback_url: callbackUrl }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Payment initialization failed");
  return data; // { payment, authorization_url }
};

// Verify a payment by reference
export const verifyPayment = async (reference, token) => {
  const res = await fetch(`${API_BASE_URL}/payments/verify/${reference}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Payment verification failed");
  return data; // payment object
};

// Delete a payment (Admin only)
export const deletePayment = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/payments/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete payment");
  return data;
};

export const capturePaypalPayment = async (orderID, token) => {
    const res = await fetch(`${API_BASE_URL}/capture-payment`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderID: orderID }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "PayPal capture failed");
    return data; // { message: "Payment successful", payment: {...} }

};