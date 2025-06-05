import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { TransactionForm } from "./TransactionForm";

type AddTransactionProps = {
  clientId: number;
}

export const AddTransaction = ({ clientId }: AddTransactionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        size="sm"
        aria-label="add-transaction"
        colorScheme="blue"
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
      </IconButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Добавление транзакции</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <TransactionForm clientId={clientId} onSubmit={() => setIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};