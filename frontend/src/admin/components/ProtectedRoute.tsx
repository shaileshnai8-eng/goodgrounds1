import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { admin, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
