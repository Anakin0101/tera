import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from 'screens';
import { DASHBOARD_SCREEN } from 'navigation/ScreenNames';
import { DashboardStackParamsList } from 'navigation/types';
import { HeaderBackArrow } from 'components/index';
import { Colors } from 'theme/Variables';
import { useStyleTheme } from 'navigation/Navigation.styles';

const Stack = createStackNavigator<DashboardStackParamsList>();

export const DashboardStack = () => {
  const { Navigator, Screen } = Stack;
  const st = useStyleTheme();
  return (
    <Navigator
      initialRouteName={DASHBOARD_SCREEN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: HeaderBackArrow,
        headerTitleStyle: st.headerTitleStyle,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen
        name={DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
