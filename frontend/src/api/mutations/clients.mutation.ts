import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { addClient, ClientData, deleteClient } from "../client";

export const useAddClientMutation = (options?: UseMutationOptions<unknown, Error, ClientData>) =>
  useMutation({
    mutationFn: async (params) => {
      const res = await addClient(params);

      return res.data;
    },
    ...(options ?? {}),
  });

export const useDeleteClientMutation = (options?: UseMutationOptions<unknown, Error, number>) =>
  useMutation({
    mutationFn: async (params) => {
      const res = await deleteClient(params);

      return res.data;
    },
    ...(options ?? {}),
  });

