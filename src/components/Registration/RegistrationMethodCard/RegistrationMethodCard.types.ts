import { ReactNode } from 'react';

export type RegistrationMethodCardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  handlePress: () => void;
  borderTop?: boolean;
  borderBottom?: boolean;
};
