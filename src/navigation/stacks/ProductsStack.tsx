import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
} from 'navigation/ScreenNames';
import { useTheme } from 'hooks';
import { ProductsStackParamsList } from 'navigation/types';
import { CustomHeader } from 'components/CustomHeader';
import { CardInsuranceScreen } from 'screens/CardInsuranceScreen/CardInsuranceScreen';
import { LoansScreen } from 'screens/LoansScreen/LoansScreen';
import { Colors } from 'theme/Variables';
import { SelectDepositScreen } from 'screens/SelectDepositScreen/SelectDepositScreen';
import { guestNavOptions } from 'navigation/config';

const Stack = createStackNavigator<ProductsStackParamsList>();

const ProductsStackHeaderMap = {
  [MY_ACCOUNT_SCROLLABLE_SCREEN]: () => {
    return (
      <CustomHeader
        title="ჩემი ანგარიში"
        accountTitle="38.191 ლ"
        isInitialScreen
        customHeaderContainerStyle={{ backgroundColor: Colors.lightGray }}
        titlePosition={'center'}
        backElement={{ position: 'left' }}
      />
    );
  },
};

export const ProductsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
  const { FontFamily } = useTheme();
  return (
    <Navigator initialRouteName={PRODUCTS_SCREEN}>
      <Screen
        name={PRODUCTS_SCREEN}
        component={ProductsScreen}
        options={{
          title: t('common:navigation.products'),
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={ALL_ACCOUNTS_AND_CARDS_SCREEN}
        component={AllAcountsAndCardsScreen}
        options={{
          title: t('products.allAccounts'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={ACCOUNT_DETAILS_SCREEN}
        component={AccountDetailsScreen}
        options={{
          title: t('products.accountDetails'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={MY_ACCOUNT_SCROLLABLE_SCREEN}
        component={MyAccountsScrollableScreen}
        options={{
          header: ProductsStackHeaderMap[MY_ACCOUNT_SCROLLABLE_SCREEN],
          headerStyle: {
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={CARD_DETAILS_SCREEN}
        component={CardDetailsScreen}
        options={{
          title: t('products.cardDetails'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={CARD_INSURANCE}
        component={CardInsuranceScreen}
        options={{
          title: t('products.cardInsurance'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={INSURANCE_PACKAGE_DETAILS}
        component={InsurancePackageDetails}
        options={{
          title: t('products.insurancePackageDetails'),
          headerStyle: {
            backgroundColor: Colors.lightGray,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={DEPOSITS_SCREEN}
        component={DepositsScreen}
        options={{
          title: t('products.allDeposits'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={DEPOSIT_DETAILS_SCREEN}
        component={DepositDetailsScreen}
        options={{
          title: t('products.depositDetails'),
          headerStyle: {
            backgroundColor: Colors.lightGray,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={LOANS_SCREEN}
        component={LoansScreen}
        options={{
          title: t('loans.title'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={LOAN_DETAILS_SCREEN}
        component={LoanDetailsScreen}
        options={{
          title: t('loans.details'),
          headerStyle: {
            backgroundColor: Colors.lightGray,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={SELECT_DEPOSIT_SCREEN}
        component={SelectDepositScreen}
        options={{
          title: t('newDeposit.activateDeposit'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={NEW_DEPOSIT_DETAILS_SCREEN}
        component={NewDepositDetailsScreen}
        options={{
          title: t('newDeposit.activateDeposit'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />

      <Screen
        name={NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN}
        component={NewDepositInitialAmountScreen}
        options={{
          title: t('newDeposit.initialAmount'),
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN}
        component={NewDepositAdditionalInfoScreen}
        options={{
          title: t('newDeposit.additionalInfo'),
          headerStyle: {
            backgroundColor: Colors.defaultBackground,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={NEW_DEPOSIT_SUMMARY_SCREEN}
        component={NewDepositSummaryScreen}
        options={{
          title: t('newDeposit.details'),
          headerStyle: {
            backgroundColor: Colors.defaultBackground,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
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
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent',
          },
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontFamily: FontFamily.Regular,
          },
        }}
      />
      <Screen
        name={TERA_WALLET_PDF_SCREEN}
        component={TeraWalletPDFScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={TERA_WALLET_SUCCESS_SCREEN}
        component={TeraWalletSuccess}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
