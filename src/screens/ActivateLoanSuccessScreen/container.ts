import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { INITIAL_STACK, MAIN_NAVIGATOR } from 'navigation/ScreenNames';
import { RoutesGenericProp } from 'navigation/types';

export const useActivateLoanSuccess = () => {
  const { replace } = useNavigation<RoutesGenericProp<'mainNavigator'>>();

  const handlePress = useCallback(() => {
    replace(MAIN_NAVIGATOR, {
      screen: INITIAL_STACK,
    });
  }, [replace]);

  return {
    handlePress,
  };
};
