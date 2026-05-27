import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function GuestRoute({ children }) {
  const { user, loading } = useUser();
  if (loading) return null;
  return user ? <Navigate to="/messages" replace /> : children;
}
