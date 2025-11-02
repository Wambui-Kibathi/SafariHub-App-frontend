import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getUsers,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getAllDestinations
} from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/dashboard.css";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [dashboard, setDashboard] = useState({});
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashData, usersData, bookingsData, destData] = await Promise.all([
          getAdminDashboard(auth.token),
          getUsers(auth.token),
          getAllBookings(auth.token),
          getAllDestinations(auth.token),
        ]);
        setDashboard(dashData);
        setUsers(usersData);
        setBookings(bookingsData);
        setDestinations(destData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [auth.token]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id, auth.token);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id, auth.token);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}

      <div className="stats-grid">
        <div className="card">Total Users: {dashboard.total_users}</div>
        <div className="card">Total Bookings: {dashboard.total_bookings}</div>
        <div className="card">Total Destinations: {dashboard.total_destinations}</div>
      </div>

      <section>
        <h2>Users</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Bookings</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Traveler ID</th>
              <th>Destination ID</th>
              <th>Start</th>
              <th>End</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.traveler_id}</td>
                <td>{b.destination_id}</td>
                <td>{b.start_date}</td>
                <td>{b.end_date}</td>
                <td>{b.total_cost}</td>
                <td>
                  <button onClick={() => handleDeleteBooking(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Destinations</h2>
        <ul>
          {destinations.map(d => (
            <li key={d.id}>{d.name} ({d.country}) - ${d.price}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;