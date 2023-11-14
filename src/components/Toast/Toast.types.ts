export interface ToastProps {
  errorMessage?: string;
}

export interface ToastRef {
  start: (errorMessage: string) => void;
  stop: () => void;
}
