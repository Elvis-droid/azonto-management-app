import React, { createContext, useContext, useEffect, useState } from 'react';
import { getJSON, setJSON, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const current = await getJSON(STORAGE_KEYS.CURRENT_USER, null);
      setUser(current);
      setLoading(false);
    })();
  }, []);

  // Register a new user account (stored locally on the device)
  async function register(username, password) {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed || !password) {
      return { success: false, message: 'Username and password are required.' };
    }
    const users = await getJSON(STORAGE_KEYS.USERS, {});
    if (users[trimmed]) {
      return { success: false, message: 'An account with this username already exists.' };
    }
    users[trimmed] = { password };
    await setJSON(STORAGE_KEYS.USERS, users);
    const sessionUser = { username: trimmed };
    await setJSON(STORAGE_KEYS.CURRENT_USER, sessionUser);
    setUser(sessionUser);
    return { success: true };
  }

  // Sign in an existing user
  async function login(username, password) {
    const trimmed = username.trim().toLowerCase();
    const users = await getJSON(STORAGE_KEYS.USERS, {});
    const account = users[trimmed];
    if (!account || account.password !== password) {
      return { success: false, message: 'Invalid username or password.' };
    }
    const sessionUser = { username: trimmed };
    await setJSON(STORAGE_KEYS.CURRENT_USER, sessionUser);
    setUser(sessionUser);
    return { success: true };
  }

  async function logout() {
    await setJSON(STORAGE_KEYS.CURRENT_USER, null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
