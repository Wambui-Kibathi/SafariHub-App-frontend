import { useEffect, useState } from "react";
import { getDestinations } from "../api/destinationApi";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCompass } from "react-icons/fa";
import heroImage from "../assets/images/hero.jpg";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        // pick first 4 as featured for home
        setDestinations(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="home-container">
      {/* Hero section */}
      <section className="hero flex flex-center">
        <img src={heroImage} alt="SafariHub Hero" className="hero-img" />
        <div className="hero-text text-center">
            <h1 className="text-accent">Welcome to SafariHub</h1>
            <p>Discover and book amazing destinations in Kenya and around the world!</p>
            <Link to="/destinations" className="btn btn-primary btn-lg"><FaCompass className="icon-small" /> Explore Destinations</Link>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured container">
        <h2 className="text-center text-primary"><FaMapMarkerAlt className="icon" /> Featured Destinations</h2>
        {error && <p className="error">{error}</p>}
        <div className="destination-grid grid grid-auto mt-3">
            {destinations.map(dest => (
                <div key={dest.id} className="destination-card card">
                    <img src={dest.image_url} alt={dest.name} className="mb-2" />
                    <h3>{dest.name}</h3>
                    <p><FaMapMarkerAlt className="icon-small" /> {dest.country}</p>
                    <Link to={`/destinations/${dest.id}`} className="btn btn-sm btn-accent mt-2">
                    View Details
                    </Link>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
