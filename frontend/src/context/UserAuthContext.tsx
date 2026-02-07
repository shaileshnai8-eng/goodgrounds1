import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

interface UserAuthContextType {
  user: UserProfile | null;
  login: (data: UserProfile & { token: string }) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('user_token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = (data: UserProfile & { token: string }) => {
    const { token, ...profile } = data;
    setUser(profile);
    localStorage.setItem('user', JSON.stringify(profile));
    localStorage.setItem('user_token', token);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('user_token');
    navigate('/login');
  };

  const value = useMemo(() => ({ user, login, logout, isLoading }), [user, isLoading]);

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
