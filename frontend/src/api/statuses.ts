import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export const loadClientStatuses = () => api.get(apiPaths[ApiPathNames.CLIENT_STATUSES]);

export const loadTransactionStatuses = () => api.get(apiPaths[ApiPathNames.TRANSACTION_STATUSES]);