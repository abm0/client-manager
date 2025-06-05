import { useQuery } from "@tanstack/react-query";
import { loadInteractions } from "../interactions";

export const useLoadInteractions = (clientId?: number) =>
  useQuery({
    queryKey: ['interactions', clientId],
    queryFn: async () => {
      if (!clientId) {
        throw new Error("Client ID is required");
      }

      const { data } = await loadInteractions(clientId);

      return data;
    },
    retry: false,
    enabled: !!clientId,
  });