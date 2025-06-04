import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const transactions = [{
  date: '10.05.2025',
  sum: 10000,
  status: 'Переговоры',
},
{
  date: '13.05.2025',
  sum: 5000,
  status: 'Оплачено'
}]

type TransactionsListProps = {
  
};

export const TransactionsList = (props: TransactionsListProps) => (
  <Box>
    <HStack justifyContent="space-between">
      <Text fontWeight={"bold"}>Сделки с клиентом:</Text>
      <IconButton size="sm" aria-label='foo'>
        <AddIcon />
      </IconButton> 
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
        {transactions.map((transaction, index) => (
            <Tr>
              <Td>
                {transaction.date}
              </Td>
              <Td>
                {transaction.sum} руб.
              </Td>
              <Td>
                {transaction.status}
              </Td>
            </Tr>
          ))}

      </Tbody>
    </Table>
  </Box>
);