import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { useLoadTransactions } from '../../api/queries/transactions.query';
import { Transaction, TransactionStatus } from '../../models/types';
import { useLoadTransactionStatuses } from '../../api/queries/statuses.query';

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

type AddTransactionProps = {
  clientId: number;
}

const AddTransaction = ({ clientId }: AddTransactionProps) => {
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

type TransactionsListProps = {
  clientId: number;
};

export const TransactionsList = ({ clientId }: TransactionsListProps) => {
  const { data: transactions } = useLoadTransactions(clientId);
  const { data: transactionStatuses } = useLoadTransactionStatuses();

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Text fontWeight={"bold"}>Сделки с клиентом:</Text>
        <AddTransaction clientId={clientId} />
      </HStack>
      <Spacer height={2} />
      <Table>
        <Thead>
          <Tr>
            <Th>Дата</Th>
            <Th>Сумма</Th>
            <Th>Статус</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions?.map((transaction: Transaction) => {
            const status = transactionStatuses?.find((status: TransactionStatus) => status.id === transaction.status)?.name;

            return (
              <Tr>
                <Td>
                  {transaction.date}
                </Td>
                <Td>
                  {transaction.value} руб.
                </Td>
                <Td>
                  {status}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  )
};