import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type signInCredentials = {
  email: string;
  password: string;
};

interface IAuthContextData {
  signIn(credentials: signInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = false;
  const router = useRouter();

  async function signIn({ email, password }: signInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
