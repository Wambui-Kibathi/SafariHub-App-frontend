import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-page">
      <h2>Payment Failed</h2>
      <p>Unfortunately, your payment was not successful. Please try again.</p>
      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate("/bookings")}>Try Again</button>
    </div>
  );
};

export default PaymentFailure;
