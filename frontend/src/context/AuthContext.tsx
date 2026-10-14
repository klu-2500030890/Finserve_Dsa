import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, UserSession } from '../types';

interface AuthContextType {
  user: UserSession | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (role: UserRole, username?: string) => void;
  logout: () => void;
  canManageSystem: boolean; // Administrator only
  canHandleFraud: boolean; // Administrator & Manager
  canApproveTransactions: boolean; // Manager & Administrator
  canTestDsa: boolean; // All roles
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('finserve_auth');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return {
      authenticated: true,
      role: 'ADMINISTRATOR',
      username: 'Kartikeya B. (Owner)',
      token: 'DEMO-TOKEN',
      expiresIn: 86400
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('finserve_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('finserve_auth');
    }
  }, [user]);

  const setRole = (role: UserRole) => {
    if (user) {
      let username = 'User Analyst';
      if (role === 'ADMINISTRATOR') username = 'Kartikeya B. (Owner)';
      else if (role === 'MANAGER') username = 'Devin Vance (Risk Manager)';

      setUser({
        ...user,
        role,
        username
      });
    }
  };

  const login = (role: UserRole, username?: string) => {
    let name = username || 'User Analyst';
    if (!username) {
      if (role === 'ADMINISTRATOR') name = 'Kartikeya B. (Owner)';
      else if (role === 'MANAGER') name = 'Devin Vance (Risk Manager)';
    }

    setUser({
      authenticated: true,
      role,
      username: name,
      token: 'TOKEN-' + Date.now(),
      expiresIn: 86400
    });
  };

  const logout = () => {
    setUser(null);
  };

  const role = user?.role || 'USER';
  const canManageSystem = role === 'ADMINISTRATOR';
  const canHandleFraud = role === 'ADMINISTRATOR' || role === 'MANAGER';
  const canApproveTransactions = role === 'ADMINISTRATOR' || role === 'MANAGER';
  const canTestDsa = true; // All roles can test DSA labs

  return (
    <AuthContext.Provider value={{
      user,
      role,
      setRole,
      login,
      logout,
      canManageSystem,
      canHandleFraud,
      canApproveTransactions,
      canTestDsa
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
