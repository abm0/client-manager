import { Box, Divider, Heading, Spacer } from "@chakra-ui/react"
import { TransactionsList } from "../components/TransactionsList";
import { Comments } from "../components/Comments";

const client1 = {
  id: 1,
  name: 'Николаев Максим Дмитриевич',
  email: 'example@mail.ru',
  phone: '+7 999 176 82 32',
  status: 'rejected' as const,
  company: 'ИнтерСевер',
  sum: 15000,
  engagement: 'low' as const,
};

const ClientPage = () => {
  return (
    <Box>
      <Heading size="md">
        {client1.name}
      </Heading>
      <Spacer height={4}></Spacer>
      <Divider />
      <Spacer height={4}></Spacer>
      <TransactionsList />
      <Spacer height={4}></Spacer>
      <Comments />
    </Box>
  )
}

export default ClientPage