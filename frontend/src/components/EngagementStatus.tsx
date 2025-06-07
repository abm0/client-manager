import { Text } from '@chakra-ui/react';
import { getEngagementStatus } from '../utils';

const statusColorMap = {
  high: '#fa7a1e',
  medium: '#fad51e',
  low: '#969696',
} as const;

const statusLabelMap = {
  high: 'Горячий',
  medium: 'Тёплый',
  low: 'Холодный',
} as const;

type EngagementStatusProps = {
  value: number;
}



export function EngagementStatus({ value }: EngagementStatusProps) {

  
  return (
    <Text fontSize='sm' fontWeight="bold" color={statusColorMap[getEngagementStatus(value)]}>
      {statusLabelMap[getEngagementStatus(value)]}
    </Text> 
  )
}
