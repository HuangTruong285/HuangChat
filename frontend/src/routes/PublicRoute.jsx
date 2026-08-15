import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../features/auth/useAuth";
import LoadingPage from "../pages/LoadingPage";

export default function PublicRoute() {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
}
