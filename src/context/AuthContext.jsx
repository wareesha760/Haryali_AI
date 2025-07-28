// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Export hook for usage
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // set the user state
  };

  const logout = () => {
    setUser(null); // clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
