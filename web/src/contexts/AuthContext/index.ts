import { createContext } from "react";

interface AuthContext {
  token?: string;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContext>({
  setToken: () => void 0,
});
