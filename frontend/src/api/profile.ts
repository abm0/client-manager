import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export const loadProfile = () => api.get(apiPaths[ApiPathNames.PROFILE])

export const exportClients = () => 
  api.get(apiPaths[ApiPathNames.EXPORT_CLIENTS], { responseType: 'blob' })
  .then(response => {
    if (response.status !== 200) {
      throw new Error('Ошибка при экспорте');
    }
    return response.data;
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.csv';  // имя файла
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  });

export const exportTransactions = () => 
  api.get(apiPaths[ApiPathNames.EXPORT_TRANSACTIONS], { responseType: 'blob' })
  .then(response => {
    if (response.status !== 200) {
      throw new Error('Ошибка при экспорте');
    }
    return response.data;
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';  // имя файла
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  });
