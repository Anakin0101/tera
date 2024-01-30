export type CustomBackendError = {
  data: {
    code: string;
    detail?: string;
    showErrorUi?: boolean;
    status?: number;
    title?: string;
    traceId?: string;
    type?: string;
  };
  status?: number;
};
