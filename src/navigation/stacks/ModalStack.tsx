import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AuthorizationMethodsScreen, CreatePasscodeScreen, SettingsScreen } from 'screens';
import { ModalStackParamsList } from 'navigation/types';
import { hideHeader } from 'navigation/config';
import {
  AUTHORIZATION_METHODS_SCREEN,
  CREATE_PASSCODE_SCREEN,
  SETTINGS_SCREEN,
  VERIFY_EASY_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { VerifyEasyLoginScreen } from 'screens/VerifyEasyLoginScreen/VerifyEasyLoginScreen';
import { Colors } from 'theme/Variables';
import { HeaderBackArrow } from 'components/HeaderBackArrow/HeaderBackArrow';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { useTranslation } from 'react-i18next';

const ModalStack = createStackNavigator<ModalStackParamsList>();

export const ModalNavigator = () => {
  const { Navigator, Screen } = ModalStack;
  const st = useStyleTheme();
  const { t } = useTranslation();
  return (
    <Navigator
      initialRouteName={SETTINGS_SCREEN}
      screenOptions={{
        headerLeft: HeaderBackArrow,
        headerTitleStyle: st.headerTitleStyle,
        headerStyle: {
          backgroundColor: Colors.defaultBackground,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen
        name={SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{ title: t('navigation.settings') }}
      />
      <Screen
        name={AUTHORIZATION_METHODS_SCREEN}
        component={AuthorizationMethodsScreen}
        options={{ title: t('settings.choose_authorization_method') }}
      />
      <Screen
        name={VERIFY_EASY_LOGIN_SCREEN}
        component={VerifyEasyLoginScreen}
        options={hideHeader}
      />
      <Screen
        name={CREATE_PASSCODE_SCREEN}
        component={CreatePasscodeScreen}
        options={{ title: t('passcode.headerTitle') }}
      />
    </Navigator>
  );
};
