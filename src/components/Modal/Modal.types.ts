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
  snapPoints?: (string | number)[];
  hideHandle?: boolean;
  enablePadding?: boolean | undefined;
  hideCloseButton?: boolean;
  withKeyboard?: boolean;
  onCloseCallback?: () => void;
}
export type TitlePos = 'center' | 'left';
