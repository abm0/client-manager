import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useDeleteClientMutation } from "../../api/mutations/clients.mutation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type RemoveClientProps = {
  id: number;
}

export const RemoveClientButton = (props: RemoveClientProps) => {
  const { id } = props;

  const [isOpen, setIsOpen] = useState(false);

  const deleteClientMutation = useDeleteClientMutation();

  const queryClient = useQueryClient();
  
  return (
    <>
      <IconButton size="sm" aria-label="remove-client" onClick={() => {
        setIsOpen(true);
      }}>
        <DeleteIcon color="red" />
      </IconButton>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Удаление клиента</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>Вы уверены, что хотите удалить клиента?</Text>
              <HStack justifyContent="flex-end" spacing={2}>
                <Button color="red" onClick={() => {
                  deleteClientMutation.mutate(id, {
                    onSuccess: () => {
                      setIsOpen(false);
                      queryClient.invalidateQueries({ queryKey: ['clients'] });
                    }
                  });
                }}>
                  Удалить
                </Button>
                
                <Button variant="outline">Отмена</Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}