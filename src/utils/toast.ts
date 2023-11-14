let loader: any | null = null;

export const saveToastRef = (ref: any) => {
  loader = ref;
};

export const openToast = (
  message: string,
  type?: 'error' | 'success' | 'warning',
  height?: number,
) => {
  loader?.start(message, type, height);
};
export const closeToast = () => {
  loader?.stop();
};
