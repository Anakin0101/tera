import { ReactElement } from 'react';

export type FinishScreenContentProps = {
  isSuccess?: boolean;
  title?: string;
  description?: string;
  ctaTEXT?: string;
  ctaHandler?: () => void;
  children?: ReactElement;
};
