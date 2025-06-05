import { Divider, Heading, HStack, VStack } from "@chakra-ui/react"
import { TransactionsList } from "../components/TransactionsList";
import { NotesList } from "../components/Notes";
import { RemoveClientButton } from "../components/client/RemoveClient";
import { useLoadClient } from "../api/queries/clients.query";
import { useParams } from "react-router-dom";
import { PageContainer } from "../components/utility/PageContainer";

// const client1 = {
//   id: 1,
//   name: 'Николаев Максим Дмитриевич',
//   email: 'example@mail.ru',
//   phone: '+7 999 176 82 32',
//   status: 'rejected' as const,
//   company: 'ИнтерСевер',
//   sum: 15000,
//   engagement: 'low' as const,
// };

const ClientPage = () => {
  const { client_id } = useParams<{ client_id: string }>();
  
  const { data: clientData } = useLoadClient(Number(client_id));

  if (!client_id) return null;
  
  return (
    <PageContainer>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Heading size="md">
            {clientData?.full_name}
          </Heading>
          <RemoveClientButton id={Number(client_id)} />
        </HStack>      

        <Divider />
  
        <TransactionsList />
      
        <NotesList clientId={Number(client_id)} />
      </VStack>
    </PageContainer>
  )
}

export default ClientPage