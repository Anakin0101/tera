import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {
  MyAccounts,
  TransactionsScreen,
  ToAccountScreen,
  TransferToAccountScreen,
  BudgetTransactionScreen,
  TransferToBudget,
  BudgetTransferDetailsScreen,
} from 'screens';
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
  BUDGET_TRANSACTION_SCREEN,
  TRANSFER_TO_BUDGET,
  BUDGET_TRANSFER_DETAILS,
  FOREIGN_IBAN_SCREEN,
} from 'navigation/ScreenNames';
import { PrivateTransactionScreen } from 'screens/PrivateTransactionScreen/PrivateTransactionScreen';
import { TransferDetailScreen } from 'screens/TransferDetailScreen/TransferDetailScreen';
import { TransactionFinishedScreen } from 'screens/TransactionFinishedScreen/TransactionFinishedScreen';
import { OtherBankTransactionScreen } from 'screens/OtherBanksTransactionScreen/OtherBankTransactionScreen';
import { TransferToOtherBankAccountScreen } from 'screens/TransferToAccountScreen/TransferToOtherBankAccountScreen';
import { HeaderBackArrow } from 'components/index';
import { TransactionFailedScreen } from 'screens/TransactionDeclinedScreen/TransactionDeclined';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { Colors } from 'theme/Variables';
// import ForeignIbanScreen from 'screens/ForeignIbanScreen/ForeignIbanScreen';

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
  [BUDGET_TRANSACTION_SCREEN]: undefined;
  [TRANSFER_TO_BUDGET]: undefined;
  [BUDGET_TRANSFER_DETAILS]: undefined;
  [FOREIGN_IBAN_SCREEN]: undefined;
};

const Stack = createStackNavigator<TransactionsStackParamList>();

export const TransactionsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
  const st = useStyleTheme();
  return (
    <Navigator
      initialRouteName={TRANSACTIONS_SCREEN}
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
      <Screen
        name={TRANSACTIONS_SCREEN}
        component={TransactionsScreen}
        options={{
          headerShown: false,
        }}
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
      {/* <Screen
        name={FOREIGN_IBAN_SCREEN}
        component={ForeignIbanScreen}
        options={{
          title: t('transfers.where'),
        }}
      /> */}
    </Navigator>
  );
};
