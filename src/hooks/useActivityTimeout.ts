import { TIMER } from 'constants/index';
import { useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { useLogout } from './useLogout';

// NOT IN USE - use only in case hook based auto logout functionality needed
export const useActivityTimeout = () => {
  const { handleLogout } = useLogout();
  const appState = useRef(AppState.currentState);
  const timerIdRef = useRef<number | null>(null);

  const handleActivityMonitor = useCallback(() => {
    /**
     * startOrResetTimer is responsible for starting a new timer, and when finished countdown - logging the user out
     * if user is logged in (has accessToken) we request an API to log the user out
     * if user is not logged in (for example, is on Registration stack), there is no need to logout user from BE. request will fail either way
     */
    const startOrResetTimer = () => {
      if (timerIdRef.current !== null) {
        BackgroundTimer.clearTimeout(timerIdRef.current);
      }

      timerIdRef.current = BackgroundTimer.setTimeout(() => {
        handleLogout();
      }, TIMER.AUTO_LOGOUT_TIMEOUT); // 5 minutes
    };

    // Initialize timer
    startOrResetTimer();

    /**
     *
     * @param nextAppState AppStateStatus
     * handles reseting the timer, when app comes to foreground
     */
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        startOrResetTimer();
      }
      appState.current = nextAppState;
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (timerIdRef.current !== null) {
        BackgroundTimer.clearTimeout(timerIdRef.current);
      }
      appStateSubscription.remove();
    };
  }, [handleLogout]);

  return {
    handleActivityMonitor,
  };
};
