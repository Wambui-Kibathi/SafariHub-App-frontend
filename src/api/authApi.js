// src/api/authApi.js
import { API_BASE_URL } from "./config";

/* Register a new user */
export const registerUser = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Registration failed");
    return result;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

/* Login user */
export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Login failed");
    return result; // { access_token, user }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/* Logout user */
export const logoutUser = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Logout failed");
    return result;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/* Get currently logged-in user */
export const getCurrentUser = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Fetch user failed");
    return result;
  } catch (error) {
    console.error("GetMe error:", error);
    throw error;
  }
};