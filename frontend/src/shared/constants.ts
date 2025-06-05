export const API_HOST = 'http://127.0.0.1:8000/';

export enum ApiPathNames {
    TOKEN,
    REFRESH,
    REGISTER,
    PROFILE,
    CLIENT_STATUSES,
    TRANSACTION_STATUSES,
    CLIENTS,
    NOTES,
    TRANSACTIONS,
    INTERACTIONS,
}

/**
 * Список эндпоинтов на сервере
 */
export const apiPaths = {
    [ApiPathNames.TOKEN]: 'token/',
    [ApiPathNames.REFRESH]: 'token/refresh/',
    [ApiPathNames.REGISTER]: 'register/',
    [ApiPathNames.PROFILE]: 'profile/',
    [ApiPathNames.CLIENT_STATUSES]: 'client_statuses/',
    [ApiPathNames.TRANSACTION_STATUSES]: 'transaction_statuses/',
    [ApiPathNames.CLIENTS]: 'clients/',
    [ApiPathNames.NOTES]: 'notes/',
    [ApiPathNames.TRANSACTIONS]: 'transactions/',
    [ApiPathNames.INTERACTIONS]: 'interactions/',

    getPath(key: ApiPathNames) {
        return `${API_HOST}${this[key]}`
    }
};

/**
 * Ключи для хранения токенов в local storage
 */
export const ACCESS_TOKEN_LS_KEY = 'client-manager-app-access-token';
export const REFRESH_TOKEN_LS_KEY = 'client-manager-app-refresh-token';
 

