import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import LoadingPage from "./pages/LoadingPage";
import ChatPage from "./pages/ChatPage";
import FriendPage from "./pages/FriendPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import useAuth from "./features/auth/useAuth";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { initializing } = useAuth();
  return (
    <BrowserRouter>
      {initializing ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PublicRoute />}>
            <Route path="/auth" element={<AuthPage />} />
            {/* <Route path="/verify-email" .../>
          <Route path="/forgot-password".../> */}
          </Route>
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/chat" element={<ChatPage />} /> */}
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/friend" element={<FriendPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
