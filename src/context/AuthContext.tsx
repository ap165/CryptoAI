import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { authStorage } from '../services/authStorage';
import type { User, LoginRequest, RegisterRequest } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  verifyAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const clearAuthState = () => {
    authStorage.clearAuth();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const verifyAuth = async () => {
    const storedToken = authStorage.getToken();
    const storedUser = authStorage.getUser();

    if (!storedToken) {
      clearAuthState();
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.verifyJwt();
      const responseData = response.data as Record<string, any>;
      
      let parsedData = responseData;
      if (responseData.body && typeof responseData.body === 'string') {
        try { parsedData = JSON.parse(responseData.body); } catch (e) {}
      }

      // Update stored user with fresh data from verifyJwt if available
      const updatedUser = { ...storedUser } as User;
      if (parsedData.name) updatedUser.name = parsedData.name;
      if (parsedData.email) updatedUser.email = parsedData.email;
      if (parsedData.username) updatedUser.username = parsedData.username;
      
      authStorage.setUser(updatedUser);

      setToken(storedToken);
      setUser(updatedUser);
      setIsAuthenticated(true);
    } catch {
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);
    const responseData = response.data as Record<string, any>;
    
    // Parse wrapped 'body' if it exists (e.g., API Gateway responses)
    let parsedData = responseData;
    if (responseData.body && typeof responseData.body === 'string') {
      try {
        parsedData = JSON.parse(responseData.body);
      } catch (e) {
        console.error('Failed to parse response body', e);
      }
    }

    const accessToken =
      parsedData.access_token ||
      parsedData.token ||
      parsedData.accessToken ||
      parsedData.jwt ||
      (parsedData.data && parsedData.data.access_token) ||
      (parsedData.data && parsedData.data.token) ||
      (parsedData.data && parsedData.data.accessToken) ||
      (parsedData.data && parsedData.data.jwt) ||
      '';

    if (accessToken) {
      authStorage.setToken(accessToken);

      const loggedInUser: User = {
        name: parsedData.name || data.username,
        email: parsedData.email || data.email,
        username: parsedData.username || data.username,
      };
      authStorage.setUser(loggedInUser);

      setToken(accessToken);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      navigate('/chat');
    } else {
      console.error('No auth token found in response:', responseData);
      throw new Error('No authentication token received');
    }
  };

  const signup = async (data: RegisterRequest) => {
    await authApi.register(data);
  };

  const logout = () => {
    clearAuthState();
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        verifyAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
