import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { debounce } from 'utils/debounce';
import { closeToast, openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';

const DEBOUNCE_DELAY = 500;

export const useIsConnectionAlive = () => {
  const [isConnectionAlive, setIsConnectionAlive] = useState<boolean | null>(true);
  const netInfo = useNetInfo();
  const appState = useRef(AppState.currentState);
  const { t } = useTranslation();

  /**
   * When internet connection is active, on the initial load, netInfo.isInternetReachable receives value of null, then it gets false and lastly it receives value of true.
   * That's why I have introduced a couter mechanism, so if false value returns 2 times, it means we really have problems with internet and isInternetReachable is false.
   * in case netInfo.isInternetReachable receives false at first and then gets true, it means everything is fine with the connection.
   */
  const falseCountRef = useRef<number>(0);

  const checkAndUpdateConnectionStatus = debounce(() => {
    handleConnectionAliveStateChange();
  }, DEBOUNCE_DELAY);

  /**
   * updates local state for isConnectionAlive
   * opens/closes toast regarding the state value
   */
  const handleConnectionAliveStateChange = () => {
    if (netInfo.isInternetReachable !== null) {
      const currentlyConnected = netInfo.isInternetReachable && netInfo.isConnected;
      if (currentlyConnected) {
        falseCountRef.current = 0;
        setIsConnectionAlive(true);
      } else {
        falseCountRef.current += 1;
        if (falseCountRef.current > 1) {
          setIsConnectionAlive(false);
          openToast(t('common.no_internet_connection'), 'error');
        }
      }
    } else {
      falseCountRef.current = 0;
      closeToast();
    }
  };

  useLayoutEffect(() => {
    checkAndUpdateConnectionStatus();
  }, [
    isConnectionAlive,
    checkAndUpdateConnectionStatus,
    netInfo.isConnected,
    netInfo.isInternetReachable,
  ]);

  /** checks internet connection when appState changes */
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        checkAndUpdateConnectionStatus();
      }
      appState.current = nextAppState;
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateSubscription.remove();
    };
  }, [checkAndUpdateConnectionStatus]);

  return {
    isConnectionAlive,
  };
};
