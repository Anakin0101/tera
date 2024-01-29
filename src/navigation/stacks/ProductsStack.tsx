import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {
  AccountDetailsScreen,
  AllAcountsAndCardsScreen,
  MyAccountsScrollableScreen,
  ProductsScreen,
  CardDetailsScreen,
  InsurancePackageDetails,
  DepositsScreen,
  DepositDetailsScreen,
  LoanDetailsScreen,
  NewDepositDetailsScreen,
  DepositSuccessScreen,
  NewDepositInitialAmountScreen,
  NewDepositAdditionalInfoScreen,
  NewDepositSummaryScreen,
  TeraWalletScreen,
  TeraWalletPDFScreen,
  TeraWalletSuccess,
  LoanRequestScreen,
  LoanAmountScreen,
  LoanRequestTermsScreen,
  LoanRequestAdditionalInfo,
  NewLoanDetailsScreen,
  LoanRequestAcceptedScreen,
} from 'screens';
import { useTranslation } from 'react-i18next';
import {
  ACCOUNT_DETAILS_SCREEN,
  ALL_ACCOUNTS_AND_CARDS_SCREEN,
  CARD_DETAILS_SCREEN,
  CARD_INSURANCE,
  DEPOSITS_SCREEN,
  DEPOSIT_DETAILS_SCREEN,
  INSURANCE_PACKAGE_DETAILS,
  LOANS_SCREEN,
  LOAN_DETAILS_SCREEN,
  MY_ACCOUNT_SCROLLABLE_SCREEN,
  NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN,
  NEW_DEPOSIT_DETAILS_SCREEN,
  NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN,
  NEW_DEPOSIT_SUMMARY_SCREEN,
  DEPOSIT_SUCCESS_SCREEN,
  PRODUCTS_SCREEN,
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
} from 'navigation/ScreenNames';
import { ProductsStackParamsList } from 'navigation/types';
import { CardInsuranceScreen } from 'screens/CardInsuranceScreen/CardInsuranceScreen';
import { LoansScreen } from 'screens/LoansScreen/LoansScreen';
import { Colors } from 'theme/Variables';
import { SelectDepositScreen } from 'screens/SelectDepositScreen/SelectDepositScreen';
import { guestNavOptions, hideHeader } from 'navigation/config';
import { HeaderBackArrow } from 'components/HeaderBackArrow/HeaderBackArrow';
import { useStyleTheme } from 'navigation/Navigation.styles';

const Stack = createStackNavigator<ProductsStackParamsList>();

export const ProductsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
  const st = useStyleTheme();
  return (
    <Navigator
      initialRouteName={PRODUCTS_SCREEN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: HeaderBackArrow,
        headerTitleStyle: st.headerTitleStyle,
        headerStyle: {
          backgroundColor: Colors.defaultBackground,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name={PRODUCTS_SCREEN} component={ProductsScreen} options={hideHeader} />
      <Screen
        name={ALL_ACCOUNTS_AND_CARDS_SCREEN}
        component={AllAcountsAndCardsScreen}
        options={{ title: t('products.allAccounts') }}
      />
      <Screen
        name={ACCOUNT_DETAILS_SCREEN}
        component={AccountDetailsScreen}
        options={{ title: t('products.accountDetails') }}
      />
      <Screen
        name={MY_ACCOUNT_SCROLLABLE_SCREEN}
        component={MyAccountsScrollableScreen}
        options={
          {
            // TODO - add translation
          }
        }
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
        options={{ title: t('products.allDeposits') }}
      />
      <Screen
        name={DEPOSIT_DETAILS_SCREEN}
        component={DepositDetailsScreen}
        options={{ title: t('products.depositDetails') }}
      />
      <Screen name={LOANS_SCREEN} component={LoansScreen} options={{ title: t('loans.title') }} />
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
    </Navigator>
  );
};
