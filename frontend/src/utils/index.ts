export const getEngagementStatus = (value: number) => {
  if (value >= 6) {
    return 'high';
  } else if (value >= 2) {
    return 'medium';
  } else {
    return 'low';
  }
}