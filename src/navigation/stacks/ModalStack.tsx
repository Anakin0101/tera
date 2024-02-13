import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {
  AuthorizationMethodsScreen,
  CreatePasscodeScreen,
  NewPaymentScreen,
  PaymentDetailsScreen,
  PaymentSuccessScreen,
  SettingsScreen,
} from 'screens';
import { ModalStackParamsList } from 'navigation/types';
import { hideHeader } from 'navigation/config';
import {
  AUTHORIZATION_METHODS_SCREEN,
  CHECK_PAYMENT_PROVIDER_SCREEN,
  CHOOSE_PAYMENT_PROVIDER_SCREEN,
  CREATE_PASSCODE_SCREEN,
  NEW_PAYMENT_SCREEN,
  PAYMENT_DETAILS_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
  SETTINGS_SCREEN,
  VERIFY_EASY_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { VerifyEasyLoginScreen } from 'screens/VerifyEasyLoginScreen/VerifyEasyLoginScreen';
import { Colors } from 'theme/Variables';
import { HeaderBackArrow } from 'components/index';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { useTranslation } from 'react-i18next';
import { ChoosePaymentProviderScreen } from 'screens/ChoosePaymentProviderScreen/ChoosePaymentProviderScreen';
import { CheckPaymentProviderScreen } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen';

const ModalStack = createStackNavigator<ModalStackParamsList>();

export const ModalNavigator = () => {
  const { Navigator, Screen } = ModalStack;
  const st = useStyleTheme();
  const { t } = useTranslation();
  return (
    <Navigator
      initialRouteName={SETTINGS_SCREEN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: HeaderBackArrow,
        headerTitleStyle: st.headerTitleStyle,
        headerTitleContainerStyle: { maxWidth: '75%' },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.defaultBackground,
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
      <Screen
        name={NEW_PAYMENT_SCREEN}
        component={NewPaymentScreen}
        options={{
          title: t('newPayment.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={CHOOSE_PAYMENT_PROVIDER_SCREEN}
        component={ChoosePaymentProviderScreen}
        options={{
          title: '',
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={PAYMENT_DETAILS_SCREEN}
        component={PaymentDetailsScreen}
        options={{
          title: t('paymentDetailsScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={PAYMENT_SUCCESS_SCREEN}
        component={PaymentSuccessScreen}
        options={{
          title: '',
          headerShadowVisible: true,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Screen
        name={CHECK_PAYMENT_PROVIDER_SCREEN}
        component={CheckPaymentProviderScreen}
        options={{
          title: '',
          headerShadowVisible: true,
        }}
      />
    </Navigator>
  );
};
