import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type ClientSearchProps = {
  value: string;
  onChange: (value: string) => void;
}

const ClientSearch = ({ value, onChange }: ClientSearchProps) => (
  <InputGroup>
    <Input 
      value={value}
      placeholder="Поиск"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
    <InputRightElement>
      <SearchIcon />
    </InputRightElement>
  </InputGroup>
);

export { ClientSearch };
