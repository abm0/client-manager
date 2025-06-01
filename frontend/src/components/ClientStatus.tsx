import { Text } from '@chakra-ui/react';

const statusColorMap = {
  active: '#32CD32',
  potential: '#FF7F50',
  rejected: '#B22222',
}

const statusLabelMap = {
  active: 'Активный',
  potential: 'Потенциальный',
  rejected: 'Отказ',
}

type ClientStatusProps = {
  status: 'active' | 'potential' | 'rejected';
}

export function ClientStatus(props: ClientStatusProps) {
  return (
    <Text fontSize='sm' fontWeight="bold" color={statusColorMap[props.status]}>
      {statusLabelMap[props.status]}
    </Text> 
  )
}
