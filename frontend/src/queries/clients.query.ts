import { useQuery } from "@tanstack/react-query";
import { loadClients } from "../api/client";

export const useLoadClients = () =>
  useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await loadClients();

      return data;
    },
    retry: false,
  });
