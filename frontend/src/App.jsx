import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import LoadingPage from "./pages/LoadingPage";
import ChatPage from "./pages/ChatPage";

import useAuth from "./hook/useAuth";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { initializing } = useAuth();
  if (initializing) {
    return <LoadingPage />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthPage />} />
          {/* <Route path="/verify-email" .../>
          <Route path="/forgot-password".../> */}
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
