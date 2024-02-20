export type ApplicationStateProps = {
  applicationError: ApplicationErrors;
};

export type ApplicationErrors = {
  isErrorFallback: boolean;
  status?: string;
  data?: unknown;
  error?: string;
};
