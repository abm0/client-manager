import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { Credentials, login, register, UserInfo } from "../auth";
import { ACCESS_TOKEN_LS_KEY, REFRESH_TOKEN_LS_KEY } from "../../shared/constants";

export const useLoginMutation = (options?: UseMutationOptions<Credentials, Error, Credentials>) =>
  useMutation({
    mutationFn: async (creds: Credentials) => {
      const res = await login(creds);

      localStorage.setItem(ACCESS_TOKEN_LS_KEY, res.data.access);
      localStorage.setItem(REFRESH_TOKEN_LS_KEY, res.data.refresh);

      return res.data;
    },
    ...(options ?? {})
  })

export const useRegisterMutation = (options?: UseMutationOptions<UserInfo, Error, UserInfo>) =>
  useMutation({
    mutationFn: async (userInfo: UserInfo) => {
      const res = await register(userInfo)

      return res.data;
    },
    ...(options ?? {}),
  })