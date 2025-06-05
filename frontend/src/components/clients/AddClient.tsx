import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { ClientForm } from "./ClientForm";
import { AddIcon } from "@chakra-ui/icons";

export const AddClient = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme="blue" size="sm" onClick={onOpen} leftIcon={<AddIcon />}>
        Добавить клиента
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Добавление нового клиента</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <ClientForm onSubmit={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
