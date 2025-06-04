import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { addClient, ClientData } from "../api/client";

export const useAddClientMutation = (options?: UseMutationOptions<ClientData, Error, ClientData>) =>
  useMutation({
    mutationFn: async (data) => {
      const res = await addClient(data);

      return res.data;
    },
    ...(options ?? {}),
  });