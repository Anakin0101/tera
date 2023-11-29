import { ReactNode } from 'react';

export interface ModalHandler {
  open: (options: ConfigureModal) => void;
  close: () => void;
}

export interface ConfigureModal {
  element: ReactNode;
  title?: string;
  titlePosition?: TitlePos;
  disableDynamicSizing?: boolean;
  disablePanning?: boolean;
  enablePadding?: boolean | undefined;
}
export type TitlePos = 'center' | 'left';
