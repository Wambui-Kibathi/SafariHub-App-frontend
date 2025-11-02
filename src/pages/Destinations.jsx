import { useEffect, useState } from "react";
import { getDestinations } from "../api/destinationApi";
import { useAuth } from "../context/AuthContext";
import "../styles/main.css";

const Destinations = () => {
  const { auth } = useAuth(); // For admin actions later
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading) return <p>Loading destinations...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="destinations-page">
      <h1>Destinations</h1>
      <div className="destinations-grid">
        {destinations.map((dest) => (
          <div key={dest.id} className="destination-card">
            <img src={dest.image_url} alt={dest.name} className="destination-image" />
            <h3>{dest.name}</h3>
            <p>{dest.country}</p>
            <p>{dest.description}</p>
            <p className="price">${dest.price}</p>
            {/* Booking button can link to BookingForm.jsx */}
            <a href={`/book/${dest.id}`} className="btn">
              Book Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
