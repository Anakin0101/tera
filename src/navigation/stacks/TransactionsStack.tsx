import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { TransactionsScreen } from 'screens';
import { TRANSACTIONS_SCREEN } from 'navigation/ScreenNames';
import { HeaderBackArrow } from 'components';
import { Colors } from 'theme/Variables';
import { TransactionsStackParamsList } from 'navigation/types';
import { useStyleTheme } from 'navigation/Navigation.styles';

const Stack = createStackNavigator<TransactionsStackParamsList>();

export const TransactionsStack = () => {
  const { Navigator, Screen } = Stack;
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
    </Navigator>
  );
};
