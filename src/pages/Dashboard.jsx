import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import TravelerDashboard from "../components/Dashboard/TravelerDashboard";
import GuideDashboard from "../components/Dashboard/GuideDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  console.log("Dashboard - User role:", user?.role);

  if (!user) {
    return <div><p>Please log in to view dashboard.</p></div>;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (user.role === 'guide') {
    return <GuideDashboard />;
  }

  return <TravelerDashboard />;
};

export default Dashboard;