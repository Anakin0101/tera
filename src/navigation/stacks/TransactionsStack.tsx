import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyAccounts, TransactionsScreen, ToAccountScreen, TransferToAccountScreen } from 'screens';
import { useTranslation } from 'react-i18next';
import {
  MY_ACCOUNTS_SCREEN,
  TO_ACCOUNT_SCREEN,
  TRANSACTIONS_SCREEN,
  TRANSFER_TO_ACCOUNT_SCREEN,
  PRIVATE_TRANSACTION_SCREEN,
  TRANSFER_DETAIL_SCREEN,
  TRANSACTION_FINISHED_SCREEN,
  OTHER_BANK_TANSACTION_SCREEN,
  TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN,
  TRANSACTION_FAILED_SCREEN,
} from 'navigation/ScreenNames';
import { PrivateTransactionScreen } from 'screens/PrivateTransactionScreen/PrivateTransactionScreen';
import { TransferDetailScreen } from 'screens/TransferDetailScreen/TransferDetailScreen';
import { TransactionFinishedScreen } from 'screens/TransactionFinishedScreen/TransactionFinishedScreen';
import { OtherBankTransactionScreen } from 'screens/OtherBanksTransactionScreen/OtherBankTransactionScreen';
import { TransferToOtherBankAccountScreen } from 'screens/TransferToAccountScreen/TransferToOtherBankAccountScreen';
import { TransactionFailedScreen } from 'screens/TransactionDeclinedScreen/TransactionDeclined';
export type TransactionsStackParamList = {
  [TRANSACTIONS_SCREEN]: undefined;
  [MY_ACCOUNTS_SCREEN]: undefined;
  [TO_ACCOUNT_SCREEN]: undefined;
  [TRANSFER_TO_ACCOUNT_SCREEN]: undefined;
  [PRIVATE_TRANSACTION_SCREEN]: undefined;
  [TRANSFER_DETAIL_SCREEN]: undefined;
  [TRANSACTION_FINISHED_SCREEN]: undefined;
  [OTHER_BANK_TANSACTION_SCREEN]: undefined;
  [TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN]: undefined;
  [TRANSACTION_FAILED_SCREEN]: undefined;
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
          headerTitleAlign: 'center',
        }}
      />

      <Screen
        name={TO_ACCOUNT_SCREEN}
        component={ToAccountScreen}
        options={{
          title: t('სად'),
          headerBackTitle: ' ',
          headerTitleAlign: 'center',
        }}
      />
      <Screen
        name={TRANSFER_TO_ACCOUNT_SCREEN}
        component={TransferToAccountScreen}
        options={{
          title: t('საკუთარ ანგარიშზე გადარიცხვა'),
          headerBackTitle: ' ',
          headerTitleAlign: 'center',
        }}
      />
      <Screen
        name={PRIVATE_TRANSACTION_SCREEN}
        component={PrivateTransactionScreen}
        options={{
          title: t('საკუთარ ანგარიშზე გადარიცხვა'),
          headerBackTitle: ' ',
        }}
      />
      <Screen
        name={TRANSFER_DETAIL_SCREEN}
        component={TransferDetailScreen}
        options={{
          title: t('გადარიცხვის დეტალები'),
          headerStyle: {
            backgroundColor: '#F9F9F9',
          },
          headerBackTitle: ' ',
        }}
      />
      <Screen
        name={TRANSACTION_FINISHED_SCREEN}
        component={TransactionFinishedScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#F9F9F9',
          },
          headerBackTitle: ' ',
        }}
      />
      <Screen
        name={TRANSACTION_FAILED_SCREEN}
        component={TransactionFailedScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#F9F9F9',
          },
          headerBackTitle: ' ',
        }}
      />
      <Screen
        name={OTHER_BANK_TANSACTION_SCREEN}
        component={OtherBankTransactionScreen}
        options={{
          title: 'სად',
          headerStyle: {
            backgroundColor: '#F9F9F9',
          },
          headerBackTitle: ' ',
        }}
      />
      <Screen
        name={TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN}
        component={TransferToOtherBankAccountScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#F9F9F9',
          },
          headerBackTitle: ' ',
        }}
      />
    </Navigator>
  );
};
