import { api } from ".";
import { ApiPathNames, apiPaths } from "../shared/constants";

export const addNote = (content: string, clientId: number) => api.post(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.NOTES]}`, { content });

export const loadNotes = (clientId: number) => api.get(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.NOTES]}`);

export const deleteNote = (clientId: number, noteId: number) => api.delete(`${apiPaths[ApiPathNames.CLIENTS]}${clientId}/${apiPaths[ApiPathNames.NOTES]}${noteId}/`);
