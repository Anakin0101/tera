export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;

  const debouncedFunction = (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}
