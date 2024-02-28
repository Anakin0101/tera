export type ApplicationStateProps = {
  applicationError: ApplicationErrors;
  modalState: ModalStateProps;
};

export type ApplicationErrors = {
  isErrorFallback: boolean;
  status?: string;
  data?: unknown;
  error?: string;
};

export type ModalStateProps = {
  isClosed: boolean;
};
