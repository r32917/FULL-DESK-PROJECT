// Auth Context - Global Auth State
import { isAxiosError } from 'axios';
import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { AuthContextType, LoginRequest } from '../types/index';
import { authService } from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if token exists on mount
  useEffect(() => {
    const savedToken = authService.getToken();
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = useCallback(async (request: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(request);
      setToken(response.token);
    } catch (err: unknown) {
      let errorMessage = 'Login failed';

      if (isAxiosError(err)) {
        if (!err.response) {
          errorMessage = 'Cannot connect to the server. Make sure the API is running on https://localhost:7232.';
        } else {
          errorMessage = err.response.data?.message || 'Login failed';
        }
      }

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setError(null);
  }, []);

  const contextValue: AuthContextType = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
