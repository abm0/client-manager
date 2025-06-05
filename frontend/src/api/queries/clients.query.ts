import { useQuery } from "@tanstack/react-query";
import { loadClient, loadClients } from "../client";
import { Client } from "../../models/types";

export const useLoadClients = () =>
  useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await loadClients();

      return data;
    },
    retry: false,
  });

export const useLoadClient = (clientId?: number) =>
  useQuery<Client>({
    queryKey: ['client', clientId],
    queryFn: async () => {
      if (!clientId) {
        throw new Error("Client ID is required");
      }

      const { data } = await loadClient(clientId);

      return data;
    },
    retry: false,
    enabled: !!clientId,
  });