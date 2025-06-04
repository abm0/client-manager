import { Link, VStack } from "@chakra-ui/react";
import { MAIN_PATH } from "../shared/paths";
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface INavbar {
  hidden?: boolean;
}

const Navbar = (props: INavbar) => {
  const { hidden = false } = props;

  const location = useLocation();
  
  const getColorMobile = (path: string) => location.pathname === path ? 'black' : 'gray.500';
    
  if (hidden) {
    return null;
  }

  return (
    <VStack align="start">
      <Link as={RouterLink} to={MAIN_PATH} color={getColorMobile(MAIN_PATH)}>Список клиентов</Link>
    </VStack>
  );
}

export { Navbar };
