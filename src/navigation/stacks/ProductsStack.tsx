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
  PRODUCTS_SCREEN,
} from 'navigation/ScreenNames';
import { useTheme } from 'hooks';
import { ProductsStackParamsList } from 'navigation/types';
import { CustomHeader } from 'components/CustomHeader';
import { CardInsuranceScreen } from 'screens/CardInsuranceScreen/CardInsuranceScreen';
import { LoansScreen } from 'screens/LoansScreen/LoansScreen';

const Stack = createStackNavigator<ProductsStackParamsList>();

export const ProductsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
  const { FontFamily, Colors } = useTheme();
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
          header: () => (
            <CustomHeader
              title="ჩემი ანგარიში"
              accountTitle="38.191 ლ"
              isInitialScreen
              customHeaderContainerStyle={{ backgroundColor: Colors.lightGray }}
              titlePosition={'center'}
              backElement={{ position: 'left' }}
            />
          ),
          headerStyle: {
            backgroundColor: 'yellow',
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
    </Navigator>
  );
};
