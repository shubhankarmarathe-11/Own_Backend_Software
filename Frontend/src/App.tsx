import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ProjectDetails } from './pages/ProjectDetails';
import { useAuthStore } from './lib/store';

/** Redirects to /dashboard when already logged in */
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

/** Redirects to /login when not authenticated */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />

          <Route path="/signup" element={
            <PublicRoute><Signup /></PublicRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          <Route path="/project/:id" element={
            <ProtectedRoute><ProjectDetails /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
