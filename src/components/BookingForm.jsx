import { useState } from "react";
import { createBooking } from "../api/bookingApi";
import { initializePayment } from "../api/paymentApi";
import { useAuth } from "../context/AuthContext";
import "../styles/form.css";

const BookingForm = ({ destinationId }) => {
  const { auth } = useAuth();
  const [bookingData, setBookingData] = useState({
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Step 1: Create booking
      const booking = await createBooking(
        { ...bookingData, destination_id: destinationId },
        auth.token
      );

      // Step 2: Show success confirmation
      setSuccess("Booking created successfully! Redirecting to payment...");
      setLoading(false);

      // Step 3: Wait a moment, then redirect to Paystack
      setTimeout(async () => {
        const callbackUrl = `${window.location.origin}/payment-success`;
        const { authorization_url } = await initializePayment(
          booking.id,
          callbackUrl,
          auth.token
        );

        window.location.href = authorization_url;
      }, 2000);

    } catch (err) {
      console.error("Booking or Payment error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Book This Destination</h2>
      <form onSubmit={handleBooking}>
        <label>Start Date:</label>
        <input
          type="date"
          name="start_date"
          value={bookingData.start_date}
          onChange={handleChange}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          name="end_date"
          value={bookingData.end_date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Book & Pay Now"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;