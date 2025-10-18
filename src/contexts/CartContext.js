// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Claves de storage
const USER_KEY = "tn_user";
const USERS_KEY = "tn_users";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(USER_KEY, null));

  useEffect(() => {
    saveJSON(USER_KEY, user);
  }, [user]);

  const register = ({ name, email, password }) => {
    const users = loadJSON(USERS_KEY, []);
    // evita duplicados por email
    if (users.some((u) => u.email === email)) {
      throw new Error("El correo ya está registrado.");
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // (para demo académica; en real, encriptar)
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveJSON(USERS_KEY, users);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  };

  const login = ({ email, password }) => {
    const users = loadJSON(USERS_KEY, []);
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Credenciales inválidas.");
    setUser({ id: found.id, name: found.name, email: found.email });
    return found;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
