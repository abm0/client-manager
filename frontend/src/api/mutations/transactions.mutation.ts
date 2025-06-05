import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { addTransaction, deleteTransaction } from "../transactions";


type AddTransactionParams = {
  date: string;
  value: number;
  status: number;
  clientId: number;
};

export const useAddTransactionMutation = (options?: UseMutationOptions<unknown, Error, AddTransactionParams>) =>
  useMutation({
    mutationFn: async ({ date, value, status, clientId }) => {
      const res = await addTransaction({
          date,
          value,
          status,
        }, 
        clientId
      );

      return res.data;
    },
    ...(options ?? {}),
  });

export type DeleteTransactionParams = {
  clientId: number;
  transactionId: number;
};

export const useDeleteTransactionMutation = (options?: UseMutationOptions<unknown, Error, DeleteTransactionParams>) =>
  useMutation({
    mutationFn: async ({ clientId, transactionId }) => {
      const res = await deleteTransaction(clientId, transactionId);

      return res.data;
    },
    ...(options ?? {}),
  });

