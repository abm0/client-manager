import { Box, HStack, Heading, Spacer } from "@chakra-ui/react"
import { AddClient } from "../components/AddClient"
import { ClientSearch } from "../components/ClientSearch"
import { ClientsList } from "../components/ClientsList"

const MainPage = () => {
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading size="md">
          Список клиентов:
        </Heading>
        <AddClient />
      </HStack>
      <Spacer height={6} />
      <ClientsList />
    </Box>
  )
}

export default MainPage