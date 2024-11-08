import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Use the UserContext
import Loader from "./loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useUser(); // Access the user from context

  if (loading) {
    // If user is being fetched, you can display a loading state
    return <Loader/>;
  }

  // If user exists, allow access to children, otherwise navigate to login
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
