import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles/admin.css';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { useAdminAuth, LOGOUT_EVENT } from './hooks/useAdminAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  // Navigate to login whenever any hook instance fires the logout event
  useEffect(() => {
    const handler = () => navigate('/.admin', { replace: true });
    window.addEventListener(LOGOUT_EVENT, handler);
    return () => window.removeEventListener(LOGOUT_EVENT, handler);
  }, [navigate]);

  return isAuthenticated ? <>{children}</> : <Navigate to="/.admin" replace />;
}

export function AdminApp() {
  return (
    <Routes>
      {/* /.admin → login page; AdminLoginPage redirects to dashboard on success */}
      <Route path="/" element={<AdminLoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* Catch-all: send back to admin root */}
      <Route path="*" element={<Navigate to="/.admin" replace />} />
    </Routes>
  );
}
