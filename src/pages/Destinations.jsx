import { useEffect, useState } from "react";
import { getDestinations } from "../api/destinationApi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa";  // Added icons
import "../styles/main.css";

const Destinations = () => {
  const { auth } = useAuth(); // Optional, for admin actions later
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");  // Optional search

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await getDestinations();
        setDestinations(data);
        setError("");
      } catch (err) {
        setError(`Failed to load destinations: ${err.message}. <button onClick={() => window.location.reload()}>Retry</button>`);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // Filter destinations based on search (optional)
  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="destinations-page">
        <div className="loading-spinner">Loading destinations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="destinations-page">
        <p className="error" dangerouslySetInnerHTML={{ __html: error }}></p>  {/* For retry button */}
      </div>
    );
  }

  return (
    <div className="destinations-page">
      <h1><FaMapMarkerAlt className="icon" /> Destinations</h1>
      
      {/* Optional Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="destinations-grid">
        {filteredDestinations.length === 0 ? (
          <p>No destinations found. Try adjusting your search.</p>
        ) : (
          filteredDestinations.map((dest) => (
            <div key={dest.id} className="destination-card">
              <img src={dest.image_url} alt={dest.name} className="destination-image" />
              <div className="card-content">
                <h3>{dest.name}</h3>
                <p><FaMapMarkerAlt className="icon-small" /> {dest.country}</p>
                <p className="description">{dest.description}</p>
                <p className="price"><FaDollarSign className="icon-small" /> ${dest.price}</p>
                <Link to={`/book/${dest.id}`} className="btn book-btn">
                  <FaCalendarAlt className="icon-small" /> Book Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Destinations;