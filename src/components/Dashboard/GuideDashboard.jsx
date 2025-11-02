import React, { useState, useEffect } from "react";
import { getGuideDashboard, getGuideBookings, updateBookingStatus } from "../../api/guideApi";
import { useAuth } from "../../context/AuthContext";

const GuideDashboard = () => {
  const { user, token } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashboardData, bookingsData] = await Promise.all([
        getGuideDashboard(token),
        getGuideBookings(token),
      ]);
      setDashboard(dashboardData);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status, token);
      fetchDashboardData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Guide Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{dashboard?.total_bookings || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Tours</h3>
          <p>{dashboard?.active_tours || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Rating</h3>
          <p>{dashboard?.average_rating || "N/A"}</p>
        </div>
      </div>

      <div className="bookings-section">
        <h2>Recent Bookings</h2>
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h4>{booking.destination_name}</h4>
              <p>Traveler: {booking.traveler_name}</p>
              <p>Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              <div className="booking-actions">
                <button onClick={() => handleStatusUpdate(booking.id, "confirmed")}>
                  Confirm
                </button>
                <button onClick={() => handleStatusUpdate(booking.id, "cancelled")}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;