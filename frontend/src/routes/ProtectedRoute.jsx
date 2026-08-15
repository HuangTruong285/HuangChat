import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../features/auth/useAuth";

export default function ProtectedRoute() {
  const { initializing, isAuthenticated } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
