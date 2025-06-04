export const API_HOST = 'http://127.0.0.1:8000';

export enum ApiPathNames {
    TOKEN,
    REFRESH,
    REGISTER,
    PROFILE,
}

/**
 * Список эндпоинтов на сервере
 */
export const apiPaths = {
    [ApiPathNames.TOKEN]: '/token/',
    [ApiPathNames.REFRESH]: '/refresh/',
    [ApiPathNames.REGISTER]: '/register/',
    [ApiPathNames.PROFILE]: '/profile/',

    getPath(key: ApiPathNames) {
        return `${API_HOST}${this[key]}`
    }
};

/**
 * Ключи для хранения токенов в local storage
 */
export const ACCESS_TOKEN_LS_KEY = 'audio-utils-app-access-token';
export const REFRESH_TOKEN_LS_KEY = 'audio-utils-app-refresh-token';
 

