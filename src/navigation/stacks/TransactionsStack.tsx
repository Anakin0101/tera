import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyAccounts, TransactionsScreen, ToAccountScreen } from 'screens';
import { useTranslation } from 'react-i18next';
import { MY_ACCOUNTS_SCREEN, TO_ACCOUNT_SCREEN, TRANSACTIONS_SCREEN } from 'navigation/ScreenNames';

export type TransactionsStackParamList = {
  [TRANSACTIONS_SCREEN]: undefined;
  [MY_ACCOUNTS_SCREEN]: undefined;
  [TO_ACCOUNT_SCREEN]: undefined;
};

const Stack = createStackNavigator<TransactionsStackParamList>();

export const TransactionsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
  return (
    <Navigator initialRouteName={TRANSACTIONS_SCREEN}>
      <Screen
        name={TRANSACTIONS_SCREEN}
        component={TransactionsScreen}
        options={{
          title: t('common:navigation.transactions'),
          headerTitleAlign: 'left',
        }}
      />
      <Screen
        name={MY_ACCOUNTS_SCREEN}
        component={MyAccounts}
        options={{
          title: t('საიდან'),
          headerBackTitle: ' ',
        }}
      />

      <Screen
        name={TO_ACCOUNT_SCREEN}
        component={ToAccountScreen}
        options={{
          title: t('სად'),
          headerBackTitle: ' ',
        }}
      />
    </Navigator>
  );
};
