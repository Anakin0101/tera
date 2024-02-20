import React from 'react';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { clearApplicationError } from 'store/slices/applicationState';
import { FallbackComponent } from '../FallbackComponent';

/**
 * We need this component, to render Error screen, when there is not only react error, while render state, but also some other errors, for example
 * NETWORK_ERROR - if network error happens (request takes too long to resolve) we need to show "Something went wrong" screen to the user, with retry mechanism
 * Basically, ApplicationErrorWrapper returns the same component, as ErrorBoudnary, but with specific logic dependance: isErrorFallback value from our redux store
 * isErrorFallback is set in api.ts file (refer to "TIMEOUT_ERROR" in result.error part)
 * @param param0 children
 * @returns Either FallbackComponent, or children
 */
export const ApplicationErrorWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isErrorFallback } = useAppSelector(state => state.applicationState.applicationError);

  const resetError = () => {
    dispatch(clearApplicationError());
  };
  return isErrorFallback ? <FallbackComponent onRetry={resetError} /> : children;
};
