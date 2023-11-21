export const delayedNavigation = (fn: () => void, delay: number = 2000) => {
  setTimeout(() => {
    fn();
  }, delay);
};
