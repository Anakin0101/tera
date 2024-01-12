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
import { ProductsStackParamsList } from 'navigation/types';
import { CardInsuranceScreen } from 'screens/CardInsuranceScreen/CardInsuranceScreen';
import { LoansScreen } from 'screens/LoansScreen/LoansScreen';
import { Colors } from 'theme/Variables';
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
      <Screen
        name={PRODUCTS_SCREEN}
        component={ProductsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={ALL_ACCOUNTS_AND_CARDS_SCREEN}
        component={AllAcountsAndCardsScreen}
        options={{
          title: t('products.allAccounts'),
        }}
      />
      <Screen
        name={ACCOUNT_DETAILS_SCREEN}
        component={AccountDetailsScreen}
        options={{
          title: t('products.accountDetails'),
        }}
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
        options={{
          title: t('products.cardDetails'),
        }}
      />
      <Screen
        name={CARD_INSURANCE}
        component={CardInsuranceScreen}
        options={{
          title: t('products.cardInsurance'),
        }}
      />
      <Screen
        name={INSURANCE_PACKAGE_DETAILS}
        component={InsurancePackageDetails}
        options={{
          title: t('products.insurancePackageDetails'),
        }}
      />
      <Screen
        name={DEPOSITS_SCREEN}
        component={DepositsScreen}
        options={{
          title: t('products.allDeposits'),
        }}
      />
      <Screen
        name={DEPOSIT_DETAILS_SCREEN}
        component={DepositDetailsScreen}
        options={{
          title: t('products.depositDetails'),
          headerStyle: {
            backgroundColor: Colors.lightGray,
          },
        }}
      />
      <Screen
        name={LOANS_SCREEN}
        component={LoansScreen}
        options={{
          title: t('loans.title'),
        }}
      />
      <Screen
        name={LOAN_DETAILS_SCREEN}
        component={LoanDetailsScreen}
        options={{
          title: t('loans.details'),
          headerStyle: {
            backgroundColor: Colors.lightGray,
          },
        }}
      />
    </Navigator>
  );
};
