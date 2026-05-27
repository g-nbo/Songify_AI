import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshSession().finally(() => setLoading(false));
  }, []);

  // Proactively refresh the access token 1 minute before it expires (15m - 1m = 14m).
  // Prevents any in-flight request from hitting a 401 mid-session.
  useEffect(() => {
    if (!accessToken) return;
    const timer = setTimeout(() => {
      refreshSession();
    }, 14 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [accessToken]);

  async function refreshSession() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        console.warn('[auth] refresh failed', res.status, await res.text().catch(() => ''));
        setUser(null);
        setAccessToken(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (err) {
      console.warn('[auth] refresh error', err.message);
      setUser(null);
      setAccessToken(null);
    }
  }

  function login(userData, token) {
    setUser(userData);
    setAccessToken(token);
  }

  async function logout() {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  }

  function updateFavorites(newFavorites) {
    setUser(prev => prev ? { ...prev, favorites: newFavorites } : prev);
  }

  return (
    <UserContext.Provider value={{ user, accessToken, login, logout, loading, updateFavorites }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default UserContext;
