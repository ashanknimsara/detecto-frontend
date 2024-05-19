import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface UserData {
  email: string;
  phone: string;
  password: string;
  username: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (newToken: string, newData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const storedDataString = localStorage.getItem('user_data');
  const storedData = storedDataString ? JSON.parse(storedDataString) : null;

  useEffect(() => {
    try {
      if (storedData) {
        const { userToken, user } = storedData;
        setToken(userToken);
        setUserData(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
      // Handle parsing error gracefully, maybe clear localStorage or show an error message to the user
    }
  }, []);

  const login = (newToken: string, newData: UserData) => {
    try {
      localStorage.setItem("user_data", JSON.stringify({ userToken: newToken, user: newData }));
      setToken(newToken);
      setUserData(newData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing user data:", error);
      // Handle localStorage quota exceeded error gracefully, maybe show an error message to the user
    }
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
