import { createContext, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type signInCredentials = {
  email: string;
  password: string;
};

interface IAuthContextData {
  signIn(credentials: signInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: signInCredentials) {
    console.log({ email, password });
  }

  return <AuthContext.Provider value={{signIn, isAuthenticated}}>{children}</AuthContext.Provider>;
}
