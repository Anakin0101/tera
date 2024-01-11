import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ALL_TRANSACTIONS_SCREEN,
  INITIAL_STACK,
  LOADING_SCREEN,
  MODAL_STACK,
  TRANSACTION_DETAILS_SCREEN,
} from 'navigation/ScreenNames';
import { hideHeader } from 'navigation/config';
import { MainStackParamsList } from 'navigation/types';
import { ModalNavigator } from 'navigation/stacks/ModalStack';
import { useMainNavigator } from 'hooks';
import { AllTransactionsScreen, LoadingScreen, TransactionDetailsScreen } from 'screens';
import { Colors, FontFamily } from 'theme/Variables';
import { TabNavigator } from './TabNavigator';

const RootStack = createStackNavigator<MainStackParamsList>();

export const MainNavigator = () => {
  const { t } = useTranslation();
  const { Navigator, Screen } = RootStack;
  useMainNavigator();

  return (
    <Navigator initialRouteName={INITIAL_STACK}>
      <Screen name={INITIAL_STACK} component={TabNavigator} options={hideHeader} />
      <Screen name={MODAL_STACK} component={ModalNavigator} options={hideHeader} />
      <Screen
        name={ALL_TRANSACTIONS_SCREEN}
        component={AllTransactionsScreen}
        options={{
          title: t('transactions.title'),
          headerStyle: {
            backgroundColor: Colors.defaultBackground,
            shadowColor: 'transparent',
          },
          headerBackTitleVisible: false,
          headerTitleStyle: { fontFamily: FontFamily.Regular },
        }}
      />
      <Screen
        name={TRANSACTION_DETAILS_SCREEN}
        component={TransactionDetailsScreen}
        options={{
          title: t('transactions.details'),
          headerStyle: {
            backgroundColor: Colors.defaultBackground,
            shadowColor: 'transparent',
          },
          headerBackTitleVisible: false,
          headerTitleStyle: { fontFamily: FontFamily.Regular },
        }}
      />
      <Screen name={LOADING_SCREEN} component={LoadingScreen} options={hideHeader} />
    </Navigator>
  );
};
