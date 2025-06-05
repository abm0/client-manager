import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { InteractionForm } from "./InteractionForm";

type AddInteractionProps = {
  clientId: number;
}

export const AddInteraction = ({ clientId }: AddInteractionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        size="sm"
        aria-label="add-interaction"
        colorScheme="blue"
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
      </IconButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Добавление контакта</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <InteractionForm clientId={clientId} onSubmit={() => setIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};