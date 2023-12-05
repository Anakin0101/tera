import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthorizationMethodsScreen, CreatePasscodeScreen, SettingsScreen } from 'screens';
import { ModalStackParamsList } from 'navigation/types';
import { hideHeader, presentationModal } from 'navigation/config';
import { CustomHeader } from 'components/CustomHeader';
import {
  AUTHORIZATION_METHODS_SCREEN,
  CREATE_PASSCODE_SCREEN,
  SETTINGS_SCREEN,
  VERIFY_EASY_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { CustomHeaderOptions } from 'components/CustomHeader/CustomHeader.types';
import { VerifyEasyLoginScreen } from 'screens/VerifyEasyLoginScreen/VerifyEasyLoginScreen';

const ModalStack = createStackNavigator<ModalStackParamsList>();

const ModalStackHeaderMap = {
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

export const ModalNavigator = () => {
  const { Navigator, Screen } = ModalStack;

  return (
    <Navigator initialRouteName={SETTINGS_SCREEN} screenOptions={presentationModal}>
      <Screen
        name={SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{ header: ModalStackHeaderMap[SETTINGS_SCREEN] }}
      />

      <Screen
        name={VERIFY_EASY_LOGIN_SCREEN}
        component={VerifyEasyLoginScreen}
        options={hideHeader}
      />
      <Screen
        name={CREATE_PASSCODE_SCREEN}
        component={CreatePasscodeScreen}
        options={{ header: ModalStackHeaderMap[CREATE_PASSCODE_SCREEN] }}
      />
      <Screen
        name={AUTHORIZATION_METHODS_SCREEN}
        component={AuthorizationMethodsScreen}
        options={{ header: ModalStackHeaderMap[AUTHORIZATION_METHODS_SCREEN] }}
      />
    </Navigator>
  );
};
