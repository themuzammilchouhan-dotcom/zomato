import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "buyer":
      return <Navigate to="/buyer" replace />;
    case "seller":
      return <Navigate to="/seller" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default HomeRedirect;
