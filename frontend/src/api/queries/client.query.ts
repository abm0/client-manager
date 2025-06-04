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

export const useLoadClient = (id?: number) =>
  useQuery<Client>({
    queryKey: ['client', id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Client ID is required");
      }

      const { data } = await loadClient(id);

      return data;
    },
    retry: false,
    enabled: !!id,
  });