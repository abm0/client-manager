import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

type InteractionData = {
  content: string;
  date: string;
}

export const addInteraction = (data: InteractionData, clientId: number) => api.post(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.INTERACTIONS]}`, data);

export const editInteraction = (data: InteractionData, clientId: number, interactionId: number) =>
  api.put(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.INTERACTIONS]}${interactionId}/`, data);

export const loadInteractions = (clientId: number) => api.get(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.INTERACTIONS]}`);

export const deleteInteraction = (clientId: number, transactionId: number) => api.delete(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.INTERACTIONS]}${transactionId}/`);
