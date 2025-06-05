
import { Box, HStack, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from '@chakra-ui/react';
import { Interaction } from '../../models/types';
import { AddInteraction } from './AddInteraction';
import { InteractionForm } from './InteractionForm';
import { useState } from 'react';
import { useLoadInteractions } from '../../api/queries/interactions.query';
import { format } from 'date-fns';
import { useDeleteInteractionMutation } from '../../api/mutations/interactions.mutation';
import { useQueryClient } from '@tanstack/react-query';

// const transactions = [{
//   date: '10.05.2025',
//   sum: 10000,
//   status: 'Переговоры',
// },
// {
//   date: '13.05.2025',
//   sum: 5000,
//   status: 'Оплачено'
// }]

type InteractionsListProps = {
  clientId: number;
};

export const InteractoinsList = ({ clientId }: InteractionsListProps) => {
  const [editedInteraction, setEditedInteraction] = useState<Interaction | null>(null);
  
  const { data: interactions } = useLoadInteractions(clientId);
  const deleteInteractionMutation = useDeleteInteractionMutation();

  const queryClient = useQueryClient();
  
  const handleDelete = (interactionId: number) => {
    deleteInteractionMutation.mutate({ clientId, interactionId }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['interactions', clientId] });
      },
    });
  };
  
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Text fontWeight={"bold"}>Взаимодействия с клиентом:</Text>
        <AddInteraction clientId={clientId} />
      </HStack>
      <Spacer height={2} />
    
      <VStack gap={2} alignItems="stretch">
        {interactions?.length === 0 && (
          <Text>Нет взаимодействий с клиентом</Text>
        )}
        
        {interactions?.map((interaction: Interaction) => {
          return (
            <VStack key={interaction.id} gap={2} alignItems="stretch">
              <Text>
                {interaction.content}
              </Text>
              <HStack gap={2}>
                <Text fontSize={12} color="gray">{format(new Date(interaction.date), 'dd-MM-yyyy HH:mm')}</Text>
                <Link onClick={() => setEditedInteraction(interaction)} fontSize={12} color="gray">Изменить</Link>
                <Link onClick={() => handleDelete(interaction.id)} fontSize={12} color="gray">Удалить</Link>
              </HStack>
            </VStack>
          );
        })}
      </VStack>

      <Modal isOpen={editedInteraction !== null} onClose={() => setEditedInteraction(null)}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Редактирование контакта</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <InteractionForm clientId={clientId} data={editedInteraction ?? undefined} onSubmit={() => setEditedInteraction(null)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
};