import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ClientSearch = () => {
  const [value, setValue] = useState('');

  
  return (
    <InputGroup>
      <Input 
        value={value}
        placeholder="Поиск"
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <InputRightElement>
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
  );
}

export { ClientSearch };
