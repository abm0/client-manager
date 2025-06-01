import { Card, CardBody, CardFooter, CardHeader, Center, HStack, Heading, Spacer, Stack, StackDivider, Tab, TabList, Tabs, Text, VStack } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useIsMobile } from "../shared/hooks";
import { ClientStatus } from "./ClientStatus";
import { EngagementStatus } from "./EngagementStatus";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "../shared/constants";
import { ClientSearch } from "./ClientSearch";

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

const client2 = {
  id: 2,
  name: 'Меркулов Ян Матвеевич',
  email: 'another.example@mail.ru',
  phone: '+7 992 518 14 14',
  status: 'active' as const,
  company: 'Деловые Линии',
  sum: 10000,
  engagement: 'high' as const,
};

const clients = [client1];

const ClientsList = () => {
  
  const navigate = useNavigate();
  
  if (isEmpty(clients)) {
    return (
      <Center>
        <Text>
          Ничего не найдено
        </Text>
      </Center>
    );
  }

  const listElements = clients.map((client) => (
    <Card key={client.id} style={{ width: '100%' }} onClick={() => navigate(CLIENT_PATH.replace(':client_id', client.id.toString()))}>
      <Stack divider={<StackDivider />} spacing={2}>
        <CardHeader>
          <VStack spacing={2} alignItems="start">
            <Heading size="md">{client.name}</Heading>
            <HStack>
              <Text size="xs">Вовлечённость:</Text>
              <EngagementStatus status={client.engagement} />
            </HStack>

            <HStack>
              <Text size="xs">Статус:</Text>
              <ClientStatus status={client.status} />
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
  ))
  
  return (
    <Tabs>
      <TabList>
        <Tab>Активные</Tab>
        <Tab>Потенциальне</Tab>
        <Tab>Отказ</Tab>
      </TabList>
      <Spacer height={4} />
      <VStack gap={4} alignItems="stretch">
        <ClientSearch />
        <VStack gap={4} alignItems="stretch">
          {listElements}
        </VStack>
      </VStack>
    </Tabs>
  );
}

export { ClientsList };
