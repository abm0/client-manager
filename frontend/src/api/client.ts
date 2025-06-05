import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export type ClientData = {
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  phone: string;
  company: string;
  status: number;
};

export const addClient = (data: ClientData) => api.post(apiPaths[ApiPathNames.CLIENTS], data);

export const loadClients = () => api.get(apiPaths[ApiPathNames.CLIENTS]);

export const deleteClient = (clientId: number) => api.delete(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/`);

export const loadClient = (clientId: number) => api.get(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/`);