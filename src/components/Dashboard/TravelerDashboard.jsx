import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTravelerProfile, getTravelerBookings } from "../../api/travelerApi";
import "../../styles/dashboard.css";

const TravelerDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getTravelerProfile(auth.token);
        const bookingsData = await getTravelerBookings(auth.token);
        setProfile(profileData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [auth.token]);

  return (
    <div className="traveler-dashboard">
      <h1>Traveler Dashboard</h1>
      {error && <p className="error">{error}</p>}

      <section>
        <h2>Profile</h2>
        <p>Name: {profile.full_name}</p>
        <p>Email: {profile.email}</p>
        <img src={profile.profile_pic} alt="Profile" width={100} />
      </section>

      <section>
        <h2>My Bookings</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Cost</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.destination_id}</td>
                <td>{b.start_date}</td>
                <td>{b.end_date}</td>
                <td>{b.total_cost}</td>
                <td>{b.is_paid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TravelerDashboard;