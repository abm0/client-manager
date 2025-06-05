import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { addNote, deleteNote } from "../note";

type AddNoteParams = {
  content: string;
  clientId: number;
};

export const useAddNoteMutation = (options?: UseMutationOptions<unknown, Error, AddNoteParams>) =>
  useMutation({
    mutationFn: async ({ content, clientId }) => {
      const res = await addNote(content, clientId);

      return res.data;
    },
    ...(options ?? {}),
  });

export type DeleteNoteParams = {
  clientId: number;
  noteId: number;
};

export const useDeleteNoteMutation = (options?: UseMutationOptions<unknown, Error, DeleteNoteParams>) =>
  useMutation({
    mutationFn: async ({ clientId, noteId }) => {
      const res = await deleteNote(clientId, noteId);

      return res.data;
    },
    ...(options ?? {}),
  });

