import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { RegistrationStackParamsList } from 'navigation/types';

import { useStyleTheme } from 'navigation/Navigation.styles';
import { useTranslation } from 'react-i18next';
import {
  CODE_WORD_SCREEN,
  ENTER_USERNAME_SCREEN,
  REGISTRATION_FINISH_SCREEN,
  REGISTRATION_METHOD_SCREEN,
  VERIFICATION_TYPE_SCREEN,
} from 'navigation/ScreenNames';
import { HeaderBackArrow } from 'components/HeaderBackArrow/HeaderBackArrow';
import { Colors } from 'theme/Variables';
import {
  CodeWordScreen,
  RegistrationFinishScreen,
  RegistrationMethodScreen,
  VerificationTypeScreen,
} from 'screens/index';
import { EnterUsernameScreen } from 'screens/EnterUsernameScreen/EnterUsernameScreen';

const RegistrationStack = createStackNavigator<RegistrationStackParamsList>();

export const RegistrationNavigator = () => {
  const { Navigator, Screen } = RegistrationStack;
  const st = useStyleTheme();
  const { t } = useTranslation();
  return (
    <Navigator
      initialRouteName={REGISTRATION_METHOD_SCREEN}
      screenOptions={{
        headerLeft: HeaderBackArrow,
        headerTitleStyle: st.headerTitleStyle,
        title: t('navigation.register'),
        headerStyle: {
          backgroundColor: Colors.defaultBackground,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name={REGISTRATION_METHOD_SCREEN} component={RegistrationMethodScreen} />
      <Screen name={VERIFICATION_TYPE_SCREEN} component={VerificationTypeScreen} />
      <Screen name={CODE_WORD_SCREEN} component={CodeWordScreen} />
      <Screen name={ENTER_USERNAME_SCREEN} component={EnterUsernameScreen} />
      <Screen
        name={REGISTRATION_FINISH_SCREEN}
        component={RegistrationFinishScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};
