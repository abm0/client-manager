import { EditIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useLoadTransactions } from '../../api/queries/transactions.query';
import { Transaction, TransactionStatus } from '../../models/types';
import { useLoadTransactionStatuses } from '../../api/queries/statuses.query';
import { AddTransaction } from './AddTransaction';
import { TransactionForm } from './TransactionForm';
import { useState } from 'react';

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

type TransactionsListProps = {
  clientId: number;
};

export const TransactionsList = ({ clientId }: TransactionsListProps) => {
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null);
  
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
            <Th />
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
                <Td>
                  <IconButton size="sm" aria-label='edit' onClick={() => setEditedTransaction(transaction)}>
                    <EditIcon />
                  </IconButton> 
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal isOpen={editedTransaction !== null} onClose={() => setEditedTransaction(null)}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Редактирование транзакции</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <TransactionForm clientId={clientId} data={editedTransaction ?? undefined} onSubmit={() => setEditedTransaction(null)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
};