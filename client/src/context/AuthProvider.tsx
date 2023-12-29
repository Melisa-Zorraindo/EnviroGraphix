import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedInUser, setLoggedInUser] = useState({
    company: "",
    picture: "",
  });

  const login = (loggedCompany: string, companyAvatar: string) => {
    setLoggedInUser({ company: loggedCompany, picture: companyAvatar });
  };

  const logout = () => {
    setLoggedInUser({ company: "", picture: "" });
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
