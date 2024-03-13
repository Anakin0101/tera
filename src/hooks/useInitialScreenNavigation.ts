import { useNavigation } from '@react-navigation/native';
import { INITIAL_STACK, MAIN_NAVIGATOR } from 'navigation/ScreenNames';
import { RoutesGenericProp } from 'navigation/types';
import { useCallback } from 'react';

export const useInitialScreenNavigation = () => {
  const { replace } = useNavigation<RoutesGenericProp<'mainNavigator'>>();

  const navigateToInitialScreen = useCallback(() => {
    replace(MAIN_NAVIGATOR, { screen: INITIAL_STACK });
  }, [replace]);

  return { navigateToInitialScreen };
};
