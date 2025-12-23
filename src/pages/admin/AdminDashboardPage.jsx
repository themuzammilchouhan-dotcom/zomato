import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminUsers from "./AdminUsers";
import AdminRestaurants from "./AdminRestaurants";
import AdminAnalytics from "./AdminAnalytics";
import AdminProfile from "./AdminProfile";

export default function AdminDashboardPage() {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route index element={<AdminDashboard />} /> {/* /admin */}
          <Route path="users" element={<AdminUsers />} /> {/* /admin/users */}
          <Route path="restaurants" element={<AdminRestaurants />} /> {/* /admin/restaurants */}
          <Route path="analytics" element={<AdminAnalytics />} /> {/* /admin/analytics */}
          <Route path="profile" element={<AdminProfile />} /> {/* /admin/profile */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
}
