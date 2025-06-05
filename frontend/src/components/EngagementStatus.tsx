import { Text } from '@chakra-ui/react';

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

const getEngagementStatus = (value: number): keyof typeof statusColorMap => {
  if (value >= 6) {
    return 'high';
  } else if (value >= 2) {
    return 'medium';
  } else {
    return 'low';
  }
}

export function EngagementStatus({ value }: EngagementStatusProps) {

  
  return (
    <Text fontSize='sm' fontWeight="bold" color={statusColorMap[getEngagementStatus(value)]}>
      {statusLabelMap[getEngagementStatus(value)]}
    </Text> 
  )
}
