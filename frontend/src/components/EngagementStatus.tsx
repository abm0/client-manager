import { Text } from '@chakra-ui/react';

const statusColorMap = {
  high: '#32CD32',
  low: '#B22222',
}

const statusLabelMap = {
  high: 'Высокая',
  low: 'Низкая',
}

type EngagementStatusProps = {
  status: 'high' | 'low';
}

export function EngagementStatus(props: EngagementStatusProps) {
  return (
    <Text fontSize='sm' fontWeight="bold" color={statusColorMap[props.status]}>
      {statusLabelMap[props.status]}
    </Text> 
  )
}
