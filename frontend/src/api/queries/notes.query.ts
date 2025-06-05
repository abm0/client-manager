
import { useQuery } from "@tanstack/react-query";
import { loadNotes } from "../note";

export const useLoadNotes = (clientId?: number) =>
  useQuery({
    queryKey: ['notes', clientId],
    queryFn: async () => {
      if (!clientId) {
        throw new Error("Client ID is required");
      }

      const { data } = await loadNotes(clientId);

      return data;
    },
    retry: false,
    enabled: !!clientId,
  });