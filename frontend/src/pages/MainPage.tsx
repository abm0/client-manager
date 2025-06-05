import { HStack, Heading, VStack } from "@chakra-ui/react"
import { AddClient } from "../components/clients/AddClient"
import { ClientsList } from "../components/clients/ClientsList"
import { PageContainer } from "../components/utility/PageContainer"

const MainPage = () => {
  return (
    <PageContainer>
      <VStack spacing={6} align="stretch" height={'100%'}>
        <HStack justifyContent="space-between">
          <Heading size="md">
            Список клиентов:
          </Heading>
          <AddClient />
        </HStack>
        <ClientsList />
      </VStack>
    </PageContainer>
  )
}

export default MainPage