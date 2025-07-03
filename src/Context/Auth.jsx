import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserData,
  registerUser,
  setToken,
} from "../Services/Api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);


  const handleState = async (response) => {
    const { authorization } = response.headers;

    const token = authorization.replace("Bearer ", "");
    setToken(token);
    localStorage.setItem("token", token);

    const user = await getUserData();
    const { profile } = user;
    localStorage.setItem("role", profile);

    setRole(profile);

    setAuthenticated(true);

    navigate("/");
  };

  const createUser = async (form) => {
    const response = await registerUser(form);
    if (response) {
      return "User created";
    }
  };

  const checkStoredToken = async () => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedRole) {
      setRole(storedRole);

      setToken(storedToken);

      setAuthenticated(true);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    setAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    checkStoredToken();
  }, []);

  

  const value = useMemo(
    () => ({
      authenticated,
      role,
      loading,
      createUser,
      logout,
    }),
    [authenticated, role, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
