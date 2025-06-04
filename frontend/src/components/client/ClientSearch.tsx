import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

type ClientSearchProps = {
  value: string;
  onChange: (value: string) => void;
}

const ClientSearch = ({ value, onChange }: ClientSearchProps) => (
  <InputGroup paddingBottom={4}>
    <Input
      value={value}
      placeholder="Поиск"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
    <InputRightElement>
      {value ? (
        <IconButton
            size="sm"
            variant="ghost"
            aria-label="Очистить"
            icon={<CloseIcon />}
            onClick={() => onChange('')}
          />
      ) : <SearchIcon />}
    </InputRightElement>
  </InputGroup>
);

export { ClientSearch };
