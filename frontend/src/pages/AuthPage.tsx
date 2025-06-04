import { AuthForm } from "../components/auth/AuthForm";
import { RegisterForm } from "../components/auth/RegisterForm";

import { Navigate } from "react-router-dom";
import { MAIN_PATH } from "../shared/paths";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthProvider";

const AuthPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to={MAIN_PATH} />
  }
  
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Авторизация</Tab>
        <Tab>Регистрация</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AuthForm />
        </TabPanel>
        <TabPanel>
          <RegisterForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export { AuthPage };
