import axios from 'axios';
import { ACCESS_TOKEN_LS_KEY, API_HOST, ApiPathNames, apiPaths, REFRESH_TOKEN_LS_KEY } from '../shared/constants';
import { AUTH_PATH } from '../shared/paths';

const api = axios.create({
  baseURL: `${API_HOST}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_LS_KEY);
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Если уже пробовали обновлять токен — не повторяем
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN_LS_KEY);

        const response = await axios.post(`${API_HOST}/api${apiPaths[ApiPathNames.REFRESH]}`, {
          refresh: refresh_token,
        });

        const new_access_token = response.data.access;
        localStorage.setItem('access_token', new_access_token);

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${new_access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // refresh токен тоже невалиден — можно сделать logout
        console.error("Refresh token invalid", refreshError);
        // Очистка и редирект на login
        localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
        localStorage.removeItem(REFRESH_TOKEN_LS_KEY);
        console.log(window.location.href);
        if (window.location.pathname !== AUTH_PATH) {
          window.location.href = AUTH_PATH;
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
