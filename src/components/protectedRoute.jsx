import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Use the UserContext

function ProtectedRoute({ children }) {
  const { user } = useUser(); // Access the user from context

  if (user === null) {
    // If user is being fetched, you can display a loading state
    return <div>Loading...</div>;
  }

  // If user exists, allow access to children, otherwise navigate to login
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
