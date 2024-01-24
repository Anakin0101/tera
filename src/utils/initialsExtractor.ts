export const getInitials = (name: string | null): string => {
  if (name == null) {
    return '';
  }
  return (
    name
      .split(' ')
      .filter(n => n !== '')
      .map(n => n[0])
      .join('. ') + '.'
  );
};
