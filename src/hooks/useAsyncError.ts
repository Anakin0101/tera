import { useCallback, useState } from 'react';

/**
 * Error boundaries catch JavaScript errors anywhere in their child component tree,
 * but does not catch errors for Asynchronous code. This means we cannot catch any api
 * errors because asynchronous code runs outside the render and commit phases of React.
 * As a workaround this hook allows us to trigger the Errorboundary inside an async catch block.
 * It uses setState inside useCallback which foreces the async error into the react render.
 *
 * Usage:
 *
 *  const throwError = useAsyncError();
 *  fetch('/')
 *    .then((response) => response.json())
 *    .catch(error => throwError(error)); // triggers Errorboundary
 *
 * @returns
 */
export const useAsyncError = () => {
  const [, setError] = useState();
  return useCallback(
    (e: any) => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
};
