import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  OnboardingScreen,
  PasscodeLoginScreen,
  PasswordLoginScreen,
  PasswordOnlyLoginScreen,
} from 'screens';
import { guestNavOptions } from 'navigation/config';
import { GuestStackParamList } from 'navigation/types';
import {
  ONBOARDING_SCREEN,
  PASSWORD_LOGIN_SCREEN,
  PASSCODE_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
} from '../ScreenNames';
import { logAllKeychainValues } from 'utils/logKeychainValues';
import { useGuestNavigator } from 'hooks/useGuestNavigator';

const Stack = createStackNavigator<GuestStackParamList>();

export const GuestNavigator = () => {
  const { Navigator, Screen } = Stack;
  const { loading, initialRoute } = useGuestNavigator();

  if (loading) {
    return null;
  }

  //   TODO TEMp!
  //   logAllKeychainValues();
  //   clearrAllKeyChainValues();
  logAllKeychainValues();

  return (
    <Navigator initialRouteName={initialRoute} screenOptions={guestNavOptions}>
      <Screen component={OnboardingScreen} name={ONBOARDING_SCREEN} />
      <Screen component={PasswordLoginScreen} name={PASSWORD_LOGIN_SCREEN} />
      <Screen component={PasswordOnlyLoginScreen} name={PASSWORD_ONLY_LOGIN_SCREEN} />
      <Screen component={PasscodeLoginScreen} name={PASSCODE_LOGIN_SCREEN} />
    </Navigator>
  );
};
