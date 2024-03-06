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
  CardDetailsScreen,
  MyAccounts,
  ToAccountScreen,
  TransferToAccountScreen,
  BudgetTransactionScreen,
  TransferToBudget,
  BudgetTransferDetailsScreen,
  PrivateTransactionScreen,
  TransferDetailScreen,
  TransactionFinishedScreen,
  OtherBankTransactionScreen,
  TransferToOtherBankAccountScreen,
  TransactionFailedScreen,
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
  CARD_DETAILS_SCREEN,
  MY_ACCOUNTS_SCREEN,
  TO_ACCOUNT_SCREEN,
  TRANSFER_TO_ACCOUNT_SCREEN,
  PRIVATE_TRANSACTION_SCREEN,
  TRANSFER_DETAIL_SCREEN,
  TRANSACTION_FINISHED_SCREEN,
  OTHER_BANK_TANSACTION_SCREEN,
  TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN,
  TRANSACTION_FAILED_SCREEN,
  BUDGET_TRANSACTION_SCREEN,
  TRANSFER_TO_BUDGET,
  BUDGET_TRANSFER_DETAILS,
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
        name={CHOOSE_MOBILE_PROVIDER_SCREEN}
        component={ChooseMobileProviderScreen}
        options={{
          title: t('chooseMobileProviderScreen.title'),
        }}
      />
      <Screen
        name={PAYMENT_ERROR_SCREEN}
        component={PaymentErrorScreen}
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
      <Screen
        name={CHOOSE_PAYMENT_ACCOUNT_SCREEN}
        component={ChoosePaymentAccountScreen}
        options={{
          title: t('choosePaymentAccountScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={AUTOMATIC_PAYMENTS_SCREEN}
        component={AutomaticPaymentsScreen}
        options={{
          title: t('automaticPayments.title'),
          headerStyle: { backgroundColor: Colors.white },
        }}
      />
      <Screen
        name={AUTOMATIC_PAYMENT_DETAILS_SCREEN}
        component={AutomaticPaymentDetailsScreen}
        options={{ title: t('automaticPayments.paymentDetails') }}
      />
      <Screen
        name={NEW_AUTOMATIC_PAYMENT_SCREEN}
        component={NewAutomaticPaymentScreen}
        options={{
          title: t('automaticPayments.newPayment'),
          headerStyle: { backgroundColor: Colors.white },
        }}
      />
      <Screen
        name={ADD_CART_SCREEN}
        component={AddCartScreen}
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
        component={CartListScreen}
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
        component={CartPaymentListScreen}
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
        component={CartPaymentSuccessScreen}
        options={{
          title: '',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Screen
        name={NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN}
        component={NewAutomaticPaymentDetailsScreen}
        options={{ title: t('automaticPayments.paymentDetails') }}
      />
      <Screen
        name={ALL_TRANSACTIONS_SCREEN}
        component={AllTransactionsScreen}
        options={{ title: t('transactions.title') }}
      />
      <Screen
        name={TRANSACTION_DETAILS_SCREEN}
        component={TransactionDetailsScreen}
        options={{ title: t('transactions.details') }}
      />
      <Screen
        name={CARD_DETAILS_SCREEN}
        component={CardDetailsScreen}
        options={{ title: t('products.cardDetails') }}
      />
      <Screen
        name={MY_ACCOUNTS_SCREEN}
        component={MyAccounts}
        options={{
          title: t('transfers.fromWhere'),
        }}
      />

      <Screen
        name={TO_ACCOUNT_SCREEN}
        component={ToAccountScreen}
        options={{
          title: t('transfers.where'),
        }}
      />
      <Screen
        name={TRANSFER_TO_ACCOUNT_SCREEN}
        component={TransferToAccountScreen}
        options={{
          title: t('transfers.toOwnAccount'),
        }}
      />
      <Screen
        name={PRIVATE_TRANSACTION_SCREEN}
        component={PrivateTransactionScreen}
        options={{
          title: t('transfers.otherBanks'),
        }}
      />
      <Screen
        name={TRANSFER_DETAIL_SCREEN}
        component={TransferDetailScreen}
        options={{
          title: t('transactions.transDetails'),
        }}
      />
      <Screen
        name={TRANSACTION_FINISHED_SCREEN}
        component={TransactionFinishedScreen}
        options={{
          title: '',
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Screen
        name={TRANSACTION_FAILED_SCREEN}
        component={TransactionFailedScreen}
        options={{
          title: '',
        }}
      />
      <Screen
        name={OTHER_BANK_TANSACTION_SCREEN}
        component={OtherBankTransactionScreen}
        options={{
          title: t('transfers.where'),
        }}
      />
      <Screen
        name={TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN}
        component={TransferToOtherBankAccountScreen}
        options={{
          title: '',
        }}
      />
      <Screen
        name={BUDGET_TRANSACTION_SCREEN}
        component={BudgetTransactionScreen}
        options={{
          title: t('transfers.where'),
        }}
      />
      <Screen
        name={TRANSFER_TO_BUDGET}
        component={TransferToBudget}
        options={{
          title: t('transactions.transferToBudget'),
        }}
      />
      <Screen
        name={BUDGET_TRANSFER_DETAILS}
        component={BudgetTransferDetailsScreen}
        options={{
          title: t('transactions.details'),
        }}
      />
    </Navigator>
  );
};
