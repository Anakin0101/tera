export type EasyLoginModalProps = {
  type: EasyLoginModalType;
  handlePress?: () => void;
  cancelOnly?: boolean;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
};

export const easyLoginModalType = {
  ENABLE: 'enable',
  ACTIVATE: 'activate',
};

export type EasyLoginModalType = 'enable' | 'activate';
