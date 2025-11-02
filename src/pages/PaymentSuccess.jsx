import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api/paymentApi";
import { useAuth } from "../context/AuthContext";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("Verifying payment...");
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reference = searchParams.get("reference"); 
  useEffect(() => {
    if (!reference) {
      setError("No payment reference found.");
      setStatus("");
      return;
    }

    const verify = async () => {
      try {
        const payment = await verifyPayment(reference, auth.token);
        if (payment.status === "success") {
          setStatus("Payment successful! Your booking is confirmed.");
        } else {
          setError("Payment failed. Please try again.");
          setStatus("");
        }
      } catch (err) {
        setError(err.message);
        setStatus("");
      }
    };

    verify();
  }, [reference, auth.token]);

  return (
    <div className="payment-page">
      <h2>Payment Status</h2>
      {status && <p>{status}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default PaymentSuccess;
