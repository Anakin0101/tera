import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {
  AddCartScreen,
  AllTransactionsScreen,
  AuthorizationMethodsScreen,
  AutomaticPaymentDetailsScreen,
  AutomaticPaymentsScreen,
  CartListScreen,
  CartPaymentListScreen,
  ChoosePaymentAccountScreen,
  CreatePasscodeScreen,
  NewAutomaticPaymentDetailsScreen,
  NewAutomaticPaymentScreen,
  NewPaymentScreen,
  PaymentDetailsScreen,
  PaymentSuccessScreen,
  SettingsScreen,
  TransactionDetailsScreen,
} from 'screens';
import { ModalStackParamsList } from 'navigation/types';
import { hideHeader } from 'navigation/config';
import {
  ADD_CART_SCREEN,
  ALL_TRANSACTIONS_SCREEN,
  AUTHORIZATION_METHODS_SCREEN,
  AUTOMATIC_PAYMENTS_SCREEN,
  AUTOMATIC_PAYMENT_DETAILS_SCREEN,
  CART_LIST_SCREEN,
  CART_PAYMENT_LIST_SCREEN,
  CART_PAYMENT_SUCCESS_SCREEN,
  CHECK_PAYMENT_PROVIDER_SCREEN,
  CHOOSE_MOBILE_PROVIDER_SCREEN,
  CHOOSE_PAYMENT_ACCOUNT_SCREEN,
  CHOOSE_PAYMENT_PROVIDER_SCREEN,
  CREATE_PASSCODE_SCREEN,
  NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN,
  NEW_AUTOMATIC_PAYMENT_SCREEN,
  NEW_PAYMENT_SCREEN,
  PAYMENT_DETAILS_SCREEN,
  PAYMENT_ERROR_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
  SETTINGS_SCREEN,
  TRANSACTION_DETAILS_SCREEN,
  VERIFY_EASY_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { VerifyEasyLoginScreen } from 'screens/VerifyEasyLoginScreen/VerifyEasyLoginScreen';
import { Colors } from 'theme/Variables';
import { HeaderBackArrow } from 'components/index';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { useTranslation } from 'react-i18next';
import { ChoosePaymentProviderScreen } from 'screens/ChoosePaymentProviderScreen/ChoosePaymentProviderScreen';
import { CheckPaymentProviderScreen } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen';
import { ChooseMobileProviderScreen } from 'screens/ChooseMobileProviderScreen/ChooseMobileProviderScreen';
import { PaymentErrorScreen } from 'screens/PaymentErrorScreen/PaymentErrorScreen';
import { CartPaymentSuccessScreen } from 'screens/CartPaymentSuccessScreen/CartPaymentSuccessScreen';
import { withActivityTimeout } from 'components/HOC';

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
        component={withActivityTimeout(SettingsScreen)}
        options={{ title: t('navigation.settings') }}
      />
      <Screen
        name={AUTHORIZATION_METHODS_SCREEN}
        component={withActivityTimeout(AuthorizationMethodsScreen)}
        options={{ title: t('settings.choose_authorization_method') }}
      />
      <Screen
        name={VERIFY_EASY_LOGIN_SCREEN}
        component={withActivityTimeout(VerifyEasyLoginScreen)}
        options={hideHeader}
      />
      <Screen
        name={CREATE_PASSCODE_SCREEN}
        component={withActivityTimeout(CreatePasscodeScreen)}
        options={{ title: t('passcode.headerTitle') }}
      />
      <Screen
        name={NEW_PAYMENT_SCREEN}
        component={withActivityTimeout(NewPaymentScreen)}
        options={{
          title: t('newPayment.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={CHOOSE_PAYMENT_PROVIDER_SCREEN}
        component={withActivityTimeout(ChoosePaymentProviderScreen)}
        options={{
          title: '',
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={PAYMENT_DETAILS_SCREEN}
        component={withActivityTimeout(PaymentDetailsScreen)}
        options={{
          title: t('paymentDetailsScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={PAYMENT_SUCCESS_SCREEN}
        component={withActivityTimeout(PaymentSuccessScreen)}
        options={{
          title: '',
          headerShadowVisible: true,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Screen
        name={CHOOSE_MOBILE_PROVIDER_SCREEN}
        component={withActivityTimeout(ChooseMobileProviderScreen)}
        options={{
          title: t('chooseMobileProviderScreen.title'),
        }}
      />
      <Screen
        name={PAYMENT_ERROR_SCREEN}
        component={withActivityTimeout(PaymentErrorScreen)}
        options={{
          title: '',
          headerShadowVisible: true,
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Screen
        name={CHECK_PAYMENT_PROVIDER_SCREEN}
        component={withActivityTimeout(CheckPaymentProviderScreen)}
        options={{
          title: '',
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={CHOOSE_PAYMENT_ACCOUNT_SCREEN}
        component={withActivityTimeout(ChoosePaymentAccountScreen)}
        options={{
          title: t('choosePaymentAccountScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={AUTOMATIC_PAYMENTS_SCREEN}
        component={withActivityTimeout(AutomaticPaymentsScreen)}
        options={{
          title: t('automaticPayments.title'),
          headerStyle: { backgroundColor: Colors.white },
        }}
      />
      <Screen
        name={AUTOMATIC_PAYMENT_DETAILS_SCREEN}
        component={withActivityTimeout(AutomaticPaymentDetailsScreen)}
        options={{ title: t('automaticPayments.paymentDetails') }}
      />
      <Screen
        name={NEW_AUTOMATIC_PAYMENT_SCREEN}
        component={withActivityTimeout(NewAutomaticPaymentScreen)}
        options={{
          title: t('automaticPayments.newPayment'),
          headerStyle: { backgroundColor: Colors.white },
        }}
      />
      <Screen
        name={ADD_CART_SCREEN}
        component={withActivityTimeout(AddCartScreen)}
        options={{
          title: t('addCartScreen.title'),
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: Colors.white,
          },
        }}
      />
      <Screen
        name={CART_LIST_SCREEN}
        component={withActivityTimeout(CartListScreen)}
        options={{
          title: t('cartListScreen.title'),
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: Colors.white,
          },
        }}
      />
      <Screen
        name={CART_PAYMENT_LIST_SCREEN}
        component={withActivityTimeout(CartPaymentListScreen)}
        options={{
          title: '',
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: Colors.white,
          },
        }}
      />
      <Screen
        name={CART_PAYMENT_SUCCESS_SCREEN}
        component={withActivityTimeout(CartPaymentSuccessScreen)}
        options={{
          title: '',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Screen
        name={NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN}
        component={withActivityTimeout(NewAutomaticPaymentDetailsScreen)}
        options={{ title: t('automaticPayments.paymentDetails') }}
      />
      <Screen
        name={ALL_TRANSACTIONS_SCREEN}
        component={withActivityTimeout(AllTransactionsScreen)}
        options={{ title: t('transactions.title') }}
      />
      <Screen
        name={TRANSACTION_DETAILS_SCREEN}
        component={withActivityTimeout(TransactionDetailsScreen)}
        options={{ title: t('transactions.details') }}
      />
    </Navigator>
  );
};
