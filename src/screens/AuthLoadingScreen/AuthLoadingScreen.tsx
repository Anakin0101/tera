import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoutesGenericProp } from '../../navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useGuestNavigator } from 'hooks/useGuestNavigator';
import { GUEST_NAVIGATOR, INITIAL_STACK, MAIN_NAVIGATOR } from '../../navigation/ScreenNames';
import { CustomStatusBar, LoadingView } from 'components/index';
import { useStyleTheme } from './AuthLoadingScreen.styles';
import { useKeyChain } from 'hooks/useKeychain';

export const AuthLoadingScreen = () => {
  const { replace } = useNavigation<RoutesGenericProp<'guestNavigator' | 'mainNavigator'>>();
  const accessToken = useAppSelector(state => state.userInfo.accessToken);
  const { initialRoute } = useGuestNavigator();
  const st = useStyleTheme();
  const { loading } = useKeyChain();

  const setCorrectScreen = useCallback(() => {
    if (accessToken) {
      replace(MAIN_NAVIGATOR, { screen: INITIAL_STACK });
    } else {
      replace(GUEST_NAVIGATOR, { screen: initialRoute });
    }
  }, [accessToken, initialRoute, replace]);

  useEffect(() => {
    if (!loading) {
      setCorrectScreen();
    }
  }, [loading, setCorrectScreen]);

  return (
    <View style={st.center}>
      <CustomStatusBar />
      <LoadingView />
    </View>
  );
};
