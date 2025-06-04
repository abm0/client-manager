import { useQuery } from "@tanstack/react-query";
import { loadClientStatuses, loadTransactionStatuses } from "../statuses";

export const useLoadClientStatuses = () =>
  useQuery({
    queryKey: ['clientStatuses'],
    queryFn: async () => {
      const { data } = await loadClientStatuses();

      return data;
    },
    retry: false,
  });

export const useLoadTransactionStatuses = () =>
  useQuery({
    queryKey: ['transactionStatuses'],
    queryFn: async () => {
      const { data } = await loadTransactionStatuses();

      return data;
    },
    retry: false,
  });
