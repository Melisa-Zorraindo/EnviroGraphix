import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useCookies } from "react-cookie";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cookie] = useCookies(null);
  const [loggedInUser, setLoggedInUser] = useState({
    company: cookie.enviroUser,
    picture: cookie.enviroAvatar,
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
