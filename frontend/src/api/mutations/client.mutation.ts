import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { addClient, ClientData, deleteClient } from "../client";

export const useAddClientMutation = (options?: UseMutationOptions<ClientData, Error, ClientData>) =>
  useMutation({
    mutationFn: async (data) => {
      const res = await addClient(data);

      return res.data;
    },
    ...(options ?? {}),
  });

export const useDeleteClientMutation = (options?: UseMutationOptions<number, Error, number>) =>
  useMutation({
    mutationFn: async (data) => {
      const res = await deleteClient(data);

      return res.data;
    },
    ...(options ?? {}),
  });

