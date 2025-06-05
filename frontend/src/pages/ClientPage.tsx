import { Divider, Heading, HStack, Text, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react"
import { TransactionsList } from "../components/transactions/Transactions";
import { NotesList } from "../components/Notes";
import { RemoveClientButton } from "../components/clients/RemoveClient";
import { useLoadClient } from "../api/queries/clients.query";
import { useParams } from "react-router-dom";
import { PageContainer } from "../components/utility/PageContainer";
import { InteractoinsList } from "../components/interactions/Interactions";

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
        <VStack spacing={1} align="stretch">
          <HStack justifyContent="space-between">
            <Heading size="md">
              {clientData?.full_name}
            </Heading>
            <RemoveClientButton id={Number(client_id)} />
          </HStack>
          <Text color="gray.500" fontWeight="bold" fontSize={16}>{clientData?.company}</Text>
        </VStack>

        <Divider />

        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab onClick={() => window.scrollTo(0, 0)}>
              Сделки
            </Tab>
            <Tab onClick={() => window.scrollTo(0, 0)}>
              Заметки
            </Tab>
            <Tab onClick={() => window.scrollTo(0, 0)}>
              Взаимодействия
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TransactionsList clientId={Number(client_id)} />
            </TabPanel>
        
            <TabPanel>
              <NotesList clientId={Number(client_id)} />
            </TabPanel>

            <TabPanel>
              <InteractoinsList clientId={Number(client_id)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </PageContainer>
  )
}

export default ClientPage