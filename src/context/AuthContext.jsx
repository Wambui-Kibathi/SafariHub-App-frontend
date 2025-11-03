// createContext creates a react context object that is used to store auth state and functions.
import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser } from "../api/authApi";

// useAuth is the custom hook to access the AuthContext from any component. We'll just call useAuth instead of useContext(AuthContext) directly.
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// AuthProvider is a component that wraps around parts of the app that need access to authentication state and functions.
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("authToken") || null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect checks localStorage for saved a token and loads user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser"); // access user details without refetching from server
    const storedToken = localStorage.getItem("authToken"); // get token from localStorage

    if (storedUser && storedToken) {
      setAuth({
        user: JSON.parse(storedUser),
        token: storedToken,
      });
    }
    setLoading(false);
  }, []);

  /* Register and auto-login */
  const register = async (userData) => {
    try {
      await registerUser(userData);

      // Auto-login right after registration
      const { access_token, user } = await loginUser({
        email: userData.email,
        password: userData.password,
      });

      // Save in state and localStorage
      setAuth({ token: access_token, user });
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("authUser", JSON.stringify(user));
      setError(null);

      return { access_token, user };
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed");
      throw err;
    }
  };

  /* Login */
  const login = async (credentials) => {
    try {
      const { access_token, user } = await loginUser(credentials);

      setAuth({ token: access_token, user });
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("authUser", JSON.stringify(user));
      setError(null);

      return { access_token, user };
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid credentials");
      throw err;
    }
  };

  /* Logout */
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setAuth({ user: null, token: null });
  };

  const isAuthenticated = !!auth.user;

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        loading,
        error,
        isAuthenticated,
        register,
        login,
        logout,
        setAuth, // Expose this so components can still access it if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};