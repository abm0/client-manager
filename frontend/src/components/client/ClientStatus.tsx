import { Text } from '@chakra-ui/react';

const statusColorMap = {
  'Активный': '#32CD32',
  'Потенциальный': '#FF7F50',
  'Неактивный': '#B22222',
}


type ClientStatusProps = {
  status: keyof typeof statusColorMap;
}

export function ClientStatus(props: ClientStatusProps) {
  return (
    <Text fontSize='sm' fontWeight="bold" color={statusColorMap[props.status]}>
      {props.status}
    </Text> 
  )
}
