import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export const loadProfile = () => api.get(apiPaths[ApiPathNames.PROFILE])