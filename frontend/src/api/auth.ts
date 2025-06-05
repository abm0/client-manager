import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export type Credentials = {
  email: string;
  password: string;
}

export const login = (data: Credentials) => api.post(apiPaths[ApiPathNames.TOKEN], data)

export type UserInfo = {
  email: string;
  password: string;
  username: string;
}

export const register = (data: UserInfo) => api.post(apiPaths[ApiPathNames.REGISTER], data)