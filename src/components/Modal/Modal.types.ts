import { ReactNode } from 'react';

export interface ModalHandler {
  open: (options: ConfigureModal) => void;
  close: () => void;
}

export interface ConfigureModal {
  element: ReactNode;
  title?: string;
}
