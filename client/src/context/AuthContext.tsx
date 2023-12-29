import { createContext } from "react";

interface AuthContextProps {
  loggedInUser: {
    company: string;
    picture: string;
  };
  login: (loggedCompany: string, picture: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
