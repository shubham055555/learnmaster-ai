import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = {
  admin: { id: '1', name: 'Admin User', email: 'admin@skillforge.com', role: 'admin' as UserRole },
  teacher: { id: '2', name: 'John Teacher', email: 'teacher@skillforge.com', role: 'teacher' as UserRole },
  student: { id: '3', name: 'Jane Student', email: 'student@skillforge.com', role: 'student' as UserRole },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('skillforge_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    const mockUser = mockUsers[role];
    setUser(mockUser);
    localStorage.setItem('skillforge_user', JSON.stringify(mockUser));
    
    // Navigate based on role
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'teacher':
        navigate('/teacher/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillforge_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
