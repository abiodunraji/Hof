import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export function AdminLoginPage() {
  const { login, error, loading, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Redirect once login succeeds (or if already authenticated)
  useEffect(() => {
    if (isAuthenticated) navigate('/.admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };


  return (
    <div className="admin-login">
      <div className="admin-login__inner">

        {/* Brand */}
        <div className="admin-login__brand">
          <p className="admin-login__eyebrow">House of Faridah</p>
          <h1 className="admin-login__title">Admin Panel</h1>
        </div>

        {/* Card */}
        <div className="admin-login__card">
          <form onSubmit={handleSubmit} className="admin-login__form">

            <div className="admin-login__field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                autoFocus
                required
              />
            </div>

            <div className="admin-login__field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="admin-login__error">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary admin-login__submit"
            >
              {loading ? 'Verifying…' : 'Sign In'}
            </button>

          </form>
        </div>

        <p className="admin-login__footer">
          This page is not indexed or linked publicly.
        </p>
      </div>
    </div>
  );
}
