import { useAuth } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <p>Loading user...</p>;
  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
}