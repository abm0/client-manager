import { useQuery } from "@tanstack/react-query";
import { loadTransactions } from "../transactions";

export const useLoadTransactions = (clientId?: number) =>
  useQuery({
    queryKey: ['transactions', clientId],
    queryFn: async () => {
      if (!clientId) {
        throw new Error("Client ID is required");
      }

      const { data } = await loadTransactions(clientId);

      return data;
    },
    retry: false,
    enabled: !!clientId,
  });