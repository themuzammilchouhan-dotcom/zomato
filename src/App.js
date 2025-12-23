import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";
import RoleRedirect from "./components/RoleRedirect";
import SellerDashboardPage from "./pages/seller/SellerDashboardPage";
import BuyerDashboardPage from "./pages/buyer/BuyerDashboardPage";
 
function RequireRole({ allow, children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const allowed = Array.isArray(allow) ? allow : [allow];

  // Admin can access any role-protected route
  if (!(allowed.includes(user.role) || user.role === "admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) {
    // Redirect to role-specific dashboard
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "seller") return <Navigate to="/seller" replace />;
    if (user.role === "buyer") return <Navigate to="/buyer" replace />;
    
    // return <Navigate to="/buyer" replace />;
  }

  return children;
}
function AppRoutes() {
  return (
    <Routes>
      {/* Home / default */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Buyer routes */}
      <Route
        path="/buyer/*"
        element={
          <RequireRole allow="buyer">
            <BuyerDashboardPage />
          </RequireRole>
        }
      />

      {/* Seller routes with nested sidebar */}
      <Route
        path="/seller/*"
        element={
          <RequireRole allow="seller">
            <SellerDashboardPage />
          </RequireRole>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <RequireRole allow="admin">
            <AdminDashboard />
          </RequireRole>
        }
      />

      {/* Auth routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
