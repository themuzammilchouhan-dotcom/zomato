import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "buyer":
      return <Navigate to="/buyer" replace />;
    case "seller":
      return <Navigate to="/seller" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default RoleRedirect;
