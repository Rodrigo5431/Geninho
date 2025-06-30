import React, { createContext, useState, useEffect, useMemo } from "react";
export const UserTypeContext = createContext();

export default function UserTypeProvider({ children }) {
  const [role, setRole] = useState(null);

  const handleRole = () => {
    const newRole = localStorage.getItem("role");
    const str = newRole !== null ? newRole.replace(/"/g, "") : "";
    return setRole(str);
  };

  useEffect(() => {
    handleRole();
  }, []);

  useEffect(() => {
    localStorage.setItem("role", JSON.stringify(role));
  }, [role]);

  const value = useMemo(
    () => ({
      role,
    }),
    []
  );

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
}
