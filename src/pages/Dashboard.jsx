import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import TravelerDashboard from "../components/Dashboard/TravelerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  console.log("Dashboard - User role:", user?.role);

  if (!user) {
    return <div><p>Please log in to view dashboard.</p></div>;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <TravelerDashboard />;
};

export default Dashboard;