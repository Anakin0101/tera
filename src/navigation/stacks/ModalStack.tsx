import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { ModalStackParamsList } from 'navigation/types';
import { guestNavOptions, hideHeader } from 'navigation/config';
import { Colors } from 'theme/Variables';
import { HeaderBackArrow } from 'components';
import {
  AddCartScreen,
  AllTransactionsScreen,
  ApprovedLoanPdfScreen,
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
  TariffPackagesSingleScreen,
  TariffPackagesListScreen,
  SelectDepositScreen,
  LoansScreen,
  CardInsuranceScreen,
  CardOrderDetailsScreen,
  CardOrderChooseAddressScreen,
  CardOrderChooseIbanScreen,
  CardOrderChosenCardScreen,
  CardOrderChooseCardScreen,
  CardOrderTypeScreen,
  LoanRequestAcceptedScreen,
  NewLoanDetailsScreen,
  LoanRequestAdditionalInfo,
  LoanRequestTermsScreen,
  LoanAmountScreen,
  LoanRequestScreen,
  TeraWalletSuccess,
  TeraWalletPDFScreen,
  AllAcountsAndCardsScreen,
  AccountDetailsScreen,
  InsurancePackageDetails,
  DepositsScreen,
  DepositDetailsScreen,
  LoanDetailsScreen,
  NewDepositDetailsScreen,
  NewDepositInitialAmountScreen,
  NewDepositAdditionalInfoScreen,
  NewDepositSummaryScreen,
  DepositSuccessScreen,
  TeraWalletScreen,
  VerifyEasyLoginScreen,
  ChoosePaymentProviderScreen,
  CheckPaymentProviderScreen,
  ChooseMobileProviderScreen,
  PaymentErrorScreen,
  CartPaymentSuccessScreen,
  ApprovedLoanDetailsScreen,
  ActivateLoanSuccessScreen,
  AtmsAndBranchesScreen,
  ForeignIbanScreen,
  ForeignTransferDetailsScreen,
  TransferToForeignIban,
  AllTemplatesScreen,
  InsuranceSuccessScreen,
} from 'screens';
import {
  FOREIGN_IBAN_SCREEN,
  FOREIGN_TRANSFER_DETAILS_SCREEN,
  TRANSFER_TO_FOREIGN_IBAN,
  ACTIVATE_LOAN_SUCCESS_SCREEN,
  ADD_CART_SCREEN,
  ALL_TRANSACTIONS_SCREEN,
  APPROVED_LOAN_PDF_SCREEN,
  ATMS_AND_BRANCHES_SCREEN,
  AUTHORIZATION_METHODS_SCREEN,
  AUTOMATIC_PAYMENTS_SCREEN,
  AUTOMATIC_PAYMENT_DETAILS_SCREEN,
  CART_LIST_SCREEN,
  CART_PAYMENT_LIST_SCREEN,
  CART_PAYMENT_SUCCESS_SCREEN,
  CHECK_MONEY_TRANSFER_PROVIDER_SCREEN,
  CHECK_PAYMENT_PROVIDER_SCREEN,
  CHOOSE_MOBILE_PROVIDER_SCREEN,
  CHOOSE_PAYMENT_ACCOUNT_SCREEN,
  CHOOSE_PAYMENT_PROVIDER_SCREEN,
  CREATE_PASSCODE_SCREEN,
  MONEY_TRANSFERS_SCREEN,
  MONEY_TRANSFER_DETAILS_SCREEN,
  MONEY_TRANSFER_PERMISSION_SCREEN,
  MONEY_TRANSFER_RECEIVE_SCREEN,
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
  ACCOUNT_DETAILS_SCREEN,
  ALL_ACCOUNTS_AND_CARDS_SCREEN,
  CARD_INSURANCE,
  DEPOSITS_SCREEN,
  DEPOSIT_DETAILS_SCREEN,
  INSURANCE_PACKAGE_DETAILS,
  LOANS_SCREEN,
  LOAN_DETAILS_SCREEN,
  NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN,
  NEW_DEPOSIT_DETAILS_SCREEN,
  NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN,
  NEW_DEPOSIT_SUMMARY_SCREEN,
  DEPOSIT_SUCCESS_SCREEN,
  SELECT_DEPOSIT_SCREEN,
  TERA_WALLET_SCREEN,
  TERA_WALLET_PDF_SCREEN,
  TERA_WALLET_SUCCESS_SCREEN,
  LOAN_REQUEST_SCREEN,
  LOAN_AMOUNT_SCREEN,
  LOAN_REQUEST_TERMS_SCREEN,
  LOAN_REQUEST_ADDITIONAL_INFO_SCREEN,
  NEW_LOAN_DETAILS_SCREEN,
  LOAN_REQUEST_ACCEPTED_SCREEN,
  CARD_ORDER_TYPE_SCREEN,
  CARD_ORDER_CHOOSE_CARD_SCREEN,
  CARD_ORDER_CHOSEN_CARD_SCREEN,
  CARD_ORDER_CHOOSE_IBAN_SCREEN,
  CARD_ORDER_CHOOSE_ADDRESS_SCREEN,
  CARD_ORDER_DETAILS_SCREEN,
  TARIFF_PACKAGES_SCREEN,
  TARIFF_PACKAGES_SINGLE_SCREEN,
  APPROVED_LOAN_DETAILS_SCREEN,
  MONEY_TRANSFER_SEND_SCREEN,
  MONEY_TRANSFER_SEND_ADDRESS_SCREEN,
  MONEY_TRANSFER_SEND_INFO_SCREEN,
  MONEY_TRANSFER_SEND_MONEY_SCREEN,
  MONEY_TRANSFER_SEND_PERMISSION_SCREEN,
  MONEY_TRANSFER_SEND_DETAILS_SCREEN,
  ALL_TEMPLATES_SCREEN,
  INSURANCE_SUCCESS_SCREEN,
} from 'navigation/ScreenNames';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { MoneyTransfersScreen } from 'screens/MoneyTransfersScreen/MoneyTransfersScreen';
import { MoneyTransferReceiveScreen } from 'screens/MoneyTransferReceiveScreen/MoneyTransferReceiveScreen';
import { CheckMoneyTransferProviderScreen } from 'screens/CheckMoneyTransferProviderScreen/CheckMoneyTransferProviderScreen';
import { MoneyTransferPermissionScreen } from 'screens/MoneyTransferPermissionScreen/MoneyTransferPermissionScreen';
import { MoneyTransferDetailsScreen } from 'screens/MoneyTransferDetailsScreen/MoneyTransferDetailsScreen';
import { MoneyTransferSendScreen } from 'screens/MoneyTransferSendScreen/MoneyTransferSendScreen';
import { MoneyTransferSendAddressScreen } from 'screens/MoneyTransferSendAddressScreen/MoneyTransferSendAddressScreen';
import { MoneyTransferSendInfoScreen } from 'screens/MoneyTransferSendInfoScreen/MoneyTransferSendInfoScreen';
import { MoneyTransferSendMoneyScreen } from 'screens/MoneyTransferSendMoneyScreen/MoneyTransferSendMoneyScreen';
import { MoneyTransferSendPermissionScreen } from 'screens/MoneyTransferSendPermissionScreen/MoneyTransferSendPermissionScreen';
import { MoneyTransferSendDetailsScreen } from 'screens/MoneyTransferSendDetailsScreen/MoneyTransferSendDetailsScreen';

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
        name={MONEY_TRANSFERS_SCREEN}
        component={MoneyTransfersScreen}
        options={{
          title: t('moneyTransfersScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_RECEIVE_SCREEN}
        component={MoneyTransferReceiveScreen}
        options={{
          title: t('moneyTransferReceiveScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={CHECK_MONEY_TRANSFER_PROVIDER_SCREEN}
        component={CheckMoneyTransferProviderScreen}
        options={{
          title: t('moneyTransferReceiveScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_PERMISSION_SCREEN}
        component={MoneyTransferPermissionScreen}
        options={{
          title: t('moneyTransferReceiveScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_DETAILS_SCREEN}
        component={MoneyTransferDetailsScreen}
        options={{
          title: t('moneyTransferDetailsScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_SEND_SCREEN}
        component={MoneyTransferSendScreen}
        options={{
          title: t('moneyTransferSendScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_SEND_ADDRESS_SCREEN}
        component={MoneyTransferSendAddressScreen}
        options={{
          title: t('moneyTransferSendScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_SEND_INFO_SCREEN}
        component={MoneyTransferSendInfoScreen}
        options={{
          title: t('moneyTransferSendScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_SEND_MONEY_SCREEN}
        component={MoneyTransferSendMoneyScreen}
        options={{
          title: t('moneyTransferSendMoneyScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_SEND_PERMISSION_SCREEN}
        component={MoneyTransferSendPermissionScreen}
        options={{
          title: t('moneyTransferSendScreen.title'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={MONEY_TRANSFER_SEND_DETAILS_SCREEN}
        component={MoneyTransferSendDetailsScreen}
        options={{
          title: t('moneyTransferSendDetailsScreen.title'),
          headerShadowVisible: true,
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
        name={MY_ACCOUNTS_SCREEN}
        component={MyAccounts}
        options={{
          title: t('transfers.fromWhere'),
        }}
      />
      <Screen
        name={ATMS_AND_BRANCHES_SCREEN}
        component={AtmsAndBranchesScreen}
        options={{ title: t('profile.atms_and_branches') }}
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
      <Screen
        name={ALL_ACCOUNTS_AND_CARDS_SCREEN}
        component={AllAcountsAndCardsScreen}
        options={{
          title: t('products.allAccounts'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={ACCOUNT_DETAILS_SCREEN}
        component={AccountDetailsScreen}
        options={{ title: t('products.accountDetails') }}
      />
      <Screen
        name={CARD_DETAILS_SCREEN}
        component={CardDetailsScreen}
        options={{ title: t('products.cardDetails') }}
      />
      <Screen
        name={CARD_INSURANCE}
        component={CardInsuranceScreen}
        options={{ title: t('products.cardInsurance') }}
      />
      <Screen
        name={INSURANCE_PACKAGE_DETAILS}
        component={InsurancePackageDetails}
        options={{ title: t('products.insurancePackageDetails') }}
      />
      <Screen
        name={DEPOSITS_SCREEN}
        component={DepositsScreen}
        options={{ title: t('products.allDeposits'), headerStyle: st.whiteHeader }}
      />
      <Screen
        name={DEPOSIT_DETAILS_SCREEN}
        component={DepositDetailsScreen}
        options={{ title: t('products.depositDetails') }}
      />
      <Screen
        name={LOANS_SCREEN}
        component={LoansScreen}
        options={{ title: t('loans.title'), headerStyle: st.whiteHeader }}
      />
      <Screen
        name={LOAN_DETAILS_SCREEN}
        component={LoanDetailsScreen}
        options={{ title: t('loans.details') }}
      />
      <Screen
        name={SELECT_DEPOSIT_SCREEN}
        component={SelectDepositScreen}
        options={{
          title: t('newDeposit.activateDeposit'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_DEPOSIT_DETAILS_SCREEN}
        component={NewDepositDetailsScreen}
        options={{
          title: t('newDeposit.activateDeposit'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN}
        component={NewDepositInitialAmountScreen}
        options={{
          title: t('newDeposit.initialAmount'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN}
        component={NewDepositAdditionalInfoScreen}
        options={{ title: t('newDeposit.additionalInfo') }}
      />
      <Screen
        name={NEW_DEPOSIT_SUMMARY_SCREEN}
        component={NewDepositSummaryScreen}
        options={{ title: t('newDeposit.details') }}
      />
      <Screen
        name={DEPOSIT_SUCCESS_SCREEN}
        component={DepositSuccessScreen}
        options={guestNavOptions}
      />
      <Screen
        name={TERA_WALLET_SCREEN}
        component={TeraWalletScreen}
        options={{
          title: t('newDeposit.teraWallet'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen name={TERA_WALLET_PDF_SCREEN} component={TeraWalletPDFScreen} options={hideHeader} />
      <Screen
        name={TERA_WALLET_SUCCESS_SCREEN}
        component={TeraWalletSuccess}
        options={guestNavOptions}
      />
      <Screen
        name={LOAN_REQUEST_SCREEN}
        component={LoanRequestScreen}
        options={{
          title: t('loanRequest.creditProducts'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={LOAN_AMOUNT_SCREEN}
        component={LoanAmountScreen}
        options={{
          title: t('loanRequest.amount'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={LOAN_REQUEST_TERMS_SCREEN}
        component={LoanRequestTermsScreen}
        options={{
          title: t('loanRequest.readTerms'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={LOAN_REQUEST_ADDITIONAL_INFO_SCREEN}
        component={LoanRequestAdditionalInfo}
        options={{
          title: t('loanRequest.additional'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_LOAN_DETAILS_SCREEN}
        component={NewLoanDetailsScreen}
        options={{ title: t('loanRequest.details') }}
      />
      <Screen
        name={LOAN_REQUEST_ACCEPTED_SCREEN}
        component={LoanRequestAcceptedScreen}
        options={guestNavOptions}
      />
      <Screen
        name={CARD_ORDER_TYPE_SCREEN}
        component={CardOrderTypeScreen}
        options={{
          title: t('products.type'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOOSE_CARD_SCREEN}
        component={CardOrderChooseCardScreen}
        options={{
          title: t('products.plasticCard'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOSEN_CARD_SCREEN}
        component={CardOrderChosenCardScreen}
        options={{
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOOSE_IBAN_SCREEN}
        component={CardOrderChooseIbanScreen}
        options={{
          title: t('products.account'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOOSE_ADDRESS_SCREEN}
        component={CardOrderChooseAddressScreen}
        options={{
          title: t('products.branch'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_DETAILS_SCREEN}
        component={CardOrderDetailsScreen}
        options={{
          title: t('products.cardDetails'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={TARIFF_PACKAGES_SCREEN}
        component={TariffPackagesListScreen}
        options={{ title: t('newDeposit.tariffPackages') }}
      />
      <Screen
        name={TARIFF_PACKAGES_SINGLE_SCREEN}
        component={TariffPackagesSingleScreen}
        options={{ title: t('newDeposit.tariffPackages') }}
      />
      <Screen
        name={APPROVED_LOAN_DETAILS_SCREEN}
        component={ApprovedLoanDetailsScreen}
        options={{ title: t('loans.details') }}
      />
      <Screen
        name={APPROVED_LOAN_PDF_SCREEN}
        component={ApprovedLoanPdfScreen}
        options={hideHeader}
      />
      <Screen
        name={ACTIVATE_LOAN_SUCCESS_SCREEN}
        component={ActivateLoanSuccessScreen}
        options={hideHeader}
      />
      <Screen
        name={FOREIGN_IBAN_SCREEN}
        component={ForeignIbanScreen}
        options={{
          title: t('transfers.where'),
        }}
      />
      <Screen
        name={TRANSFER_TO_FOREIGN_IBAN}
        component={TransferToForeignIban}
        options={{
          title: t('transfers.where'),
        }}
      />
      <Screen
        name={FOREIGN_TRANSFER_DETAILS_SCREEN}
        component={ForeignTransferDetailsScreen}
        options={{
          title: t('transfers.details'),
        }}
      />
      <Screen
        name={ALL_TEMPLATES_SCREEN}
        component={AllTemplatesScreen}
        options={{
          title: t('onboarding.templates'),
          headerShadowVisible: true,
        }}
      />
      <Screen
        name={INSURANCE_SUCCESS_SCREEN}
        component={InsuranceSuccessScreen}
        options={hideHeader}
      />
    </Navigator>
  );
};
