import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ProfileScreen,
  SettingsScreen,
  AuthorizationMethodsScreen,
  PasscodeLoginScreen,
  CreatePasscodeScreen,
} from 'screens';
import {
  PROFILE_SCREEN,
  AUTHORIZATION_METHODS_SCREEN,
  SETTINGS_SCREEN,
  PASSCODE_LOGIN_SCREEN,
  CREATE_PASSCODE_SCREEN,
} from 'navigation/ScreenNames';

import { ProfileStackParamsList } from 'navigation/types';
import { CustomHeader } from 'components/index';
import { CustomHeaderOptions } from 'components/CustomHeader/CustomHeader.types';

const ProfileStack = createStackNavigator<ProfileStackParamsList>();

const ProfileStackHeaderMap = {
  [PROFILE_SCREEN]: ({ options: { title } }: CustomHeaderOptions) => {
    return (
      <CustomHeader
        title={title}
        isInitialScreen
        titlePosition={'left'}
        searchElement={{ position: 'right' }}
        notificationsElement={{ position: 'right' }}
      />
    );
  },
  [AUTHORIZATION_METHODS_SCREEN]: (props: CustomHeaderOptions) => {
    return (
      <CustomHeader
        title={'settings.choose_authorization_method'}
        backElement={{ position: 'left' }}
        bottomBorder
        {...props}
      />
    );
  },
  [PASSCODE_LOGIN_SCREEN]: (props: CustomHeaderOptions) => {
    return (
      <CustomHeader title={'passcode.headerTitle'} backElement={{ position: 'left' }} {...props} />
    );
  },
  [CREATE_PASSCODE_SCREEN]: (props: CustomHeaderOptions) => {
    return (
      <CustomHeader title={'passcode.headerTitle'} backElement={{ position: 'left' }} {...props} />
    );
  },
  [SETTINGS_SCREEN]: (props: CustomHeaderOptions) => {
    return (
      <CustomHeader title={'navigation.settings'} backElement={{ position: 'left' }} {...props} />
    );
  },
};

export const ProfileNavigator = () => {
  const { Navigator, Screen } = ProfileStack;
  return (
    <Navigator initialRouteName={PROFILE_SCREEN}>
      <Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ header: ProfileStackHeaderMap[PROFILE_SCREEN] }}
      />
      <Screen
        name={SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{ header: ProfileStackHeaderMap[SETTINGS_SCREEN] }}
      />
      <Screen
        name={AUTHORIZATION_METHODS_SCREEN}
        component={AuthorizationMethodsScreen}
        options={{ header: ProfileStackHeaderMap[AUTHORIZATION_METHODS_SCREEN] }}
      />
      <Screen
        name={PASSCODE_LOGIN_SCREEN}
        component={PasscodeLoginScreen}
        options={{ header: ProfileStackHeaderMap[PASSCODE_LOGIN_SCREEN] }}
      />
      <Screen
        name={CREATE_PASSCODE_SCREEN}
        component={CreatePasscodeScreen}
        options={{ header: ProfileStackHeaderMap[CREATE_PASSCODE_SCREEN] }}
      />
    </Navigator>
  );
};
