import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function GuestRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? <Navigate to="/messages" replace /> : children;
}
