import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { addInteraction, deleteInteraction, editInteraction } from "../interactions";


type AddInteractionParams = {
  date: string;
  content: string;
  clientId: number;
};

export const useAddInteractionMutation = (options?: UseMutationOptions<unknown, Error, AddInteractionParams>) =>
  useMutation({
    mutationFn: async ({ date, content, clientId }) => {
      const res = await addInteraction({
          date,
          content,
        }, 
        clientId
      );

      return res.data;
    },
    ...(options ?? {}),
  });

type EditInteractionParams = AddInteractionParams & {
  interactionId: number;
}

export const useEditInteractionMutation = (options?: UseMutationOptions<unknown, Error, EditInteractionParams>) =>
  useMutation({
    mutationFn: async ({ date, content, clientId, interactionId }) => {
      const res = await editInteraction({
          date,
          content,
        }, 
        clientId,
        interactionId,
      );

      return res.data;
    },
    ...(options ?? {}),
  });
  
export type DeleteInteractionParams = {
  clientId: number;
  interactionId: number;
};

export const useDeleteInteractionMutation = (options?: UseMutationOptions<unknown, Error, DeleteInteractionParams>) =>
  useMutation({
    mutationFn: async ({ clientId, interactionId }) => {
      const res = await deleteInteraction(clientId, interactionId);

      return res.data;
    },
    ...(options ?? {}),
  });

