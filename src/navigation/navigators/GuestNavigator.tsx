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
  REGISTRATION_STACK,
} from '../ScreenNames';
import { useGuestNavigator } from 'hooks';
import { logAllKeychainValues } from 'utils/logKeychainValues';
import { RegistrationNavigator } from 'navigation/stacks/RegistrationStack';
import { LoadingView } from 'components/index';

const Stack = createStackNavigator<GuestStackParamList>();

export const GuestNavigator = () => {
  const { Navigator, Screen } = Stack;
  const { initialRoute, loading } = useGuestNavigator();

  //   TODO TEMp!
  logAllKeychainValues();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <Navigator initialRouteName={initialRoute} screenOptions={guestNavOptions} key={initialRoute}>
      <Screen component={OnboardingScreen} name={ONBOARDING_SCREEN} />
      <Screen component={PasswordLoginScreen} name={PASSWORD_LOGIN_SCREEN} />
      <Screen component={PasswordOnlyLoginScreen} name={PASSWORD_ONLY_LOGIN_SCREEN} />
      <Screen component={PasscodeLoginScreen} name={PASSCODE_LOGIN_SCREEN} />
      <Screen component={RegistrationNavigator} name={REGISTRATION_STACK} />
    </Navigator>
  );
};
