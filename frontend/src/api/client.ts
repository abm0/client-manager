import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export type ClientData = {
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  phone: string;
  company: string;
  statusId: number;
};

export const addClient = (clientData: ClientData) => api.post(apiPaths[ApiPathNames.CLIENTS], clientData);

export const loadClients = () => api.get(apiPaths[ApiPathNames.CLIENTS]);