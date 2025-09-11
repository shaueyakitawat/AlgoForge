import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'beginner' | 'pro';
  level: number;
  xp: number;
  credits: number;
  subscription: 'free' | 'premium' | 'enterprise';
  avatar?: string;
  isVerified: boolean;
  brokerConnected: boolean;
  tradingMode: 'paper' | 'live';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'beginner' | 'pro';
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session on app start
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const savedUser = localStorage.getItem('algoforge_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        localStorage.removeItem('algoforge_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this comes from API
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        userType: 'beginner',
        level: 2,
        xp: 1250,
        credits: 500,
        subscription: 'free',
        isVerified: true,
        brokerConnected: false,
        tradingMode: 'paper'
      };

      setUser(mockUser);
      localStorage.setItem('algoforge_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        level: 1,
        xp: 0,
        credits: 100, // Welcome credits
        subscription: 'free',
        isVerified: false,
        brokerConnected: false,
        tradingMode: 'paper'
      };

      setUser(newUser);
      localStorage.setItem('algoforge_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('algoforge_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('algoforge_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};