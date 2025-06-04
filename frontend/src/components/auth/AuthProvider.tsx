import { createContext, useState } from "react";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { type Credentials } from "../../api/auth";
import { ACCESS_TOKEN_LS_KEY, REFRESH_TOKEN_LS_KEY } from "../../shared/constants";
import { useLoginMutation } from "../../mutations/auth.mutation";

type AuthContextType = {
  isAuthenticated?: boolean;
  login: UseMutateFunction<Credentials, Error, Credentials, unknown>;
  loginStatus?: boolean;
  logout: VoidFunction;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(ACCESS_TOKEN_LS_KEY));

  const queryClient = useQueryClient();
  
  const loginMutation = useLoginMutation({
    onSuccess: () => {
      setIsAuthenticated(true);
    }
  });

  const logout = () => {
    setIsAuthenticated(false);

    localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
    localStorage.removeItem(REFRESH_TOKEN_LS_KEY);

    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: loginMutation.mutate,
        loginStatus: loginMutation.status === 'pending',
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
