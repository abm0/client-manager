import React, { useContext } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading, IconButton,
  Text, useDisclosure
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Navbar } from "./Navbar";
import { AuthContext } from "./auth/AuthProvider";
import { useLoadProfile } from "../queries/profile.query";

interface IDrawerMenu {
  children: React.ReactNode;
}

const DrawerMenu = ({ children }: IDrawerMenu) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Button colorScheme='white' variant="ghost" onClick={onOpen}>
        <HamburgerIcon w={6} h={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {children}
        </DrawerContent>
      </Drawer>
    </>
  )
}

const ProfileInfo = () => {
  const { data: profileData } = useLoadProfile();

  return (
    <Text color="black">
      {profileData?.email}
    </Text>
  );
};

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);


  
  return (
    <HStack justify="space-between">
      <Heading size="md" userSelect="none">Менеджер клиентов</Heading>

      {isAuthenticated && (
        <HStack>
          <IconButton size="sm" aria-label='foo'>
            <BellIcon />
          </IconButton> 
          <DrawerMenu>
            <DrawerHeader>
              <ProfileInfo />
              </DrawerHeader>

              <DrawerBody>
                <Navbar hidden={!isAuthenticated} />
              </DrawerBody>

              <DrawerFooter justifyContent="space-between">
                  <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>Выйти из профиля</Button>
              </DrawerFooter>
          </DrawerMenu>
        </HStack>
      )}
    </HStack>
  );
}

export { Header };

