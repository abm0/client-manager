import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

type TransactionData = {
  value: number;
  date: string;
  status: number;
}

export const addTransaction = (data: TransactionData, clientId: number) => api.post(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.TRANSACTIONS]}`, data);

export const loadTransactions = (clientId: number) => api.get(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.TRANSACTIONS]}`);

export const deleteTransaction = (clientId: number, transactionId: number) => api.delete(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.TRANSACTIONS]}${transactionId}/`);
