import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshSession().finally(() => setLoading(false));
  }, []);

  async function refreshSession() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        setUser(null);
        setAccessToken(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch {
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

  return (
    <UserContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default UserContext;
