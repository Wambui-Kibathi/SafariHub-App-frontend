import { useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import { createBooking } from "../api/bookingApi";
import { initializePayment } from "../api/paymentApi";
import { useAuth } from "../context/AuthContext";
import { FaCalendarAlt, FaCreditCard, FaSignInAlt } from "react-icons/fa";
import "../styles/form.css";

const BookingForm = () => {
  const { destinationId } = useParams(); 
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

    if (!auth || !auth.token) {
      setError("You must be logged in to make a booking.");
      return;
    }

    setLoading(true);

    try {
      const bookingPayload = {
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        destination_id: destinationId,
      };

      const booking = await createBooking(bookingPayload, auth.token);

      setSuccess("Booking created successfully! Redirecting to PayPal...");
      setLoading(false);

      // Initialize PayPal payment 
      const callbackUrl = `${window.location.origin}/payment-success`;
      const { approvalUrl } = await initializePayment(
        booking.id,
        callbackUrl,
        auth.token
      );

      // Redirect user to PayPal 
      window.location.href = approvalUrl;

    } catch (err) {
      console.error("Booking or Payment error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Conditional rendering if user is not logged in
  if (!auth || !auth.token) {
    return (
      <div className="form-container">
        <h2><FaCalendarAlt className="icon" /> Book This Destination</h2>
        <p className="error">
          You must be logged in to make a booking.{" "}
          <Link to="/login"><FaSignInAlt className="icon-small" /> Click here to log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2><FaCalendarAlt className="icon" /> Book This Destination</h2>
      <form onSubmit={handleBooking}>
        <label><FaCalendarAlt className="icon-small" /> Start Date:</label>
        <input
          type="date"
          name="start_date"
          value={bookingData.start_date}
          onChange={handleChange}
          required
        />

        <label><FaCalendarAlt className="icon-small" /> End Date:</label>
        <input
          type="date"
          name="end_date"
          value={bookingData.end_date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          <FaCreditCard className="icon-small" /> {loading ? "Processing..." : "Book & Pay Now"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
