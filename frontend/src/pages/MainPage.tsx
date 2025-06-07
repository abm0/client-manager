import { Button, HStack, Heading, VStack } from "@chakra-ui/react"
import { AddClient } from "../components/clients/AddClient"
import { ClientsList } from "../components/clients/ClientsList"
import { PageContainer } from "../components/utility/PageContainer"
import { DownloadIcon } from "@chakra-ui/icons"
import { exportClients, exportTransactions } from "../api/profile"

const MainPage = () => {
  return (
    <PageContainer>
      <VStack spacing={6} align="stretch" height={'100%'}>
        <HStack justifyContent="space-between">
          <Heading size="md">
            Список клиентов:
          </Heading>
        </HStack>
        <HStack justifyContent="flex-end">
          <Button leftIcon={<DownloadIcon />} colorScheme="blue" size="sm" onClick={() => {
            exportClients();
            exportTransactions();
          }}>
            Экспорт в CSV
          </Button>
          <AddClient />
        </HStack>
        <ClientsList />
      </VStack>
    </PageContainer>
  )
}

export default MainPage