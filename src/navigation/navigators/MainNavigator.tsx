import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {
  ALL_TRANSACTIONS_SCREEN,
  INITIAL_STACK,
  MODAL_STACK,
  TRANSACTION_DETAILS_SCREEN,
} from 'navigation/ScreenNames';
import { hideHeader } from 'navigation/config';
import { MainStackParamsList } from 'navigation/types';
import { ModalNavigator } from 'navigation/stacks/ModalStack';
import { useMainNavigator } from 'hooks';

import { AllTransactionsScreen, TransactionDetailsScreen } from 'screens';
import { Colors } from 'theme/Variables';
import { TabNavigator } from './TabNavigator';
import { HeaderBackArrow } from 'components/HeaderBackArrow/HeaderBackArrow';
import { useStyleTheme } from 'navigation/Navigation.styles';

const RootStack = createStackNavigator<MainStackParamsList>();

export const MainNavigator = () => {
  const { t } = useTranslation();
  const { Navigator, Screen } = RootStack;
  useMainNavigator();
  const st = useStyleTheme();

  return (
    <Navigator
      initialRouteName={INITIAL_STACK}
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
      <Screen name={INITIAL_STACK} component={TabNavigator} options={hideHeader} />
      <Screen name={MODAL_STACK} component={ModalNavigator} options={hideHeader} />
      <Screen
        name={ALL_TRANSACTIONS_SCREEN}
        component={AllTransactionsScreen}
        options={{
          title: t('transactions.title'),
        }}
      />
      <Screen
        name={TRANSACTION_DETAILS_SCREEN}
        component={TransactionDetailsScreen}
        options={{
          title: t('transactions.details'),
        }}
      />
    </Navigator>
  );
};
