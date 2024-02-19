import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { PaymentsScreen } from 'screens';
import { PAYMENTS_SCREEN } from 'navigation/ScreenNames';
import { HeaderBackArrow } from 'components/index';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { Colors } from 'theme/Variables';
import { PaymentsStackParamsList } from 'navigation/types';
import { hideHeader } from 'navigation/config';

const Stack = createStackNavigator<PaymentsStackParamsList>();

export const PaymentsStack = () => {
  const { Navigator, Screen } = Stack;
  const st = useStyleTheme();

  return (
    <Navigator
      initialRouteName={PAYMENTS_SCREEN}
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
      <Screen name={PAYMENTS_SCREEN} component={PaymentsScreen} options={hideHeader} />
    </Navigator>
  );
};
