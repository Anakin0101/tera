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
import { LoadingView } from 'components/index';
import { RegistrationNavigator } from 'navigation/stacks/RegistrationStack';

const Stack = createStackNavigator<GuestStackParamList>();

export const GuestNavigator = () => {
  const { Navigator, Screen } = Stack;
  const { loading, initialRoute } = useGuestNavigator();

  if (loading) {
    return <LoadingView />;
  }

  //   TODO TEMp!
  logAllKeychainValues();

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
