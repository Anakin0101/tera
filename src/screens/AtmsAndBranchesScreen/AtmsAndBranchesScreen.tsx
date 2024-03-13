import React, { useEffect, useRef } from 'react';
import { useStyleTheme } from './AtmsAndBranchesScreen.styles';
import { AppState, AppStateStatus, SafeAreaView } from 'react-native';
import { LocationSelector, AtmsAndBranchesTabs } from 'components/AtmsAndBranches';
import useGeolocation from 'hooks/useGeolocation';

export const AtmsAndBranchesScreen = () => {
  const styles = useStyleTheme();
  const { coords, locateMe, permission } = useGeolocation();
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appStateRef.current.match(/background|inactive/) && nextAppState === 'active') {
        locateMe();
      }
      appStateRef.current = nextAppState;
    };

    locateMe();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LocationSelector isPermissionGranted={permission} />
      <AtmsAndBranchesTabs coords={coords} />
    </SafeAreaView>
  );
};
