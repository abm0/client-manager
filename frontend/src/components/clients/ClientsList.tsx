import { Card, CardBody, CardHeader, Center, HStack, Heading, Stack, StackDivider, Tab, TabList, Tabs, Text, VStack } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { EngagementStatus } from "../EngagementStatus";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "../../shared/paths";
import { ClientSearch } from "./ClientSearch";
import { useLoadClients } from "../../api/queries/clients.query";
import { Client } from "../../models/types";
import { useState } from "react";
import { getEngagementStatus } from "../../utils";

const tabs = ['Горячие', 'Тёплые', 'Холодные']

const ClientsList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  
  const { data: clients } = useLoadClients();
  
  const navigate = useNavigate();
  
  const emptyContent = (
    <Center>
      <Text>
        Клиенты не найдены
      </Text>
    </Center>
  );
  
  if (isEmpty(clients)) {
    return emptyContent;
  }

  const filteredClients = clients.filter((client: Client) => {
    const engagement = getEngagementStatus(client.engagement);

    let isFilteredStatus = false

    if (tabIndex === 0) {
      isFilteredStatus = engagement === 'high';
    } else if (tabIndex === 1) {
      isFilteredStatus = engagement === 'medium';
    } else if (tabIndex === 2) {
      isFilteredStatus = engagement === 'low';
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();
    
    const isFilteredName = client.full_name.toLowerCase().includes(normalizedSearchValue);

    return isFilteredStatus && isFilteredName;
  });

  const listElements = filteredClients.map((client: Client) => {
    return (
      <Card key={client.id} style={{ width: '100%' }} onClick={() => navigate(CLIENT_PATH.replace(':client_id', client.id.toString()))}>
        <Stack divider={<StackDivider />} spacing={2}>
          <CardHeader>
            <VStack spacing={2} alignItems="start">
              <Heading size="md">{client.full_name}</Heading>
              <HStack>
                <Text size="xs">Вовлечённость:</Text>
                <EngagementStatus value={client.engagement} />
              </HStack>
            </VStack>
          </CardHeader>
          <CardBody>
            <Stack spacing={2}>
              <HStack justifyContent="space-between">
                <Text size="xs">Телефон:</Text>
                <Text fontSize='sm' fontWeight="bold">
                  {client.phone}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text size="xs">Email:</Text>
                <Text fontSize='sm' fontWeight="bold">
                  {client.email}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text size="xs">Компания:</Text>
                <Text fontSize='sm' fontWeight="bold">
                  {client.company}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text size="xs">Сумма сделок:</Text>
                <Text fontSize='sm' fontWeight="bold">
                  {client.sum} руб.
                </Text>
              </HStack>
            </Stack>
          </CardBody>
        </Stack>
      </Card>
    );
  })
  
  return (
    <Tabs variant="solid-rounded" onChange={(index) => setTabIndex(index)} index={tabIndex} height={'100%'} overflow={'hidden'}>
      <TabList paddingBottom={4}> 
        {tabs.map((tab) => (
          <Tab key={tab}>
            {tab}
          </Tab>  
        ))}
      </TabList>
      <ClientSearch value={searchValue} onChange={(v) => setSearchValue(v)} />
      <VStack gap={4} alignItems="stretch" overflow="auto" height="calc(100% - 112px)" margin="0 -16px" padding="0 16px">
        {filteredClients.length === 0 ? emptyContent : listElements}
      </VStack>
    </Tabs>
  );
}

export { ClientsList };
