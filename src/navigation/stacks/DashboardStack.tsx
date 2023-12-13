import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from 'screens';
import { ALL_TEMPLATES_SCREEN, DASHBOARD_SCREEN } from 'navigation/ScreenNames';
import { AllTemplatesScreen } from 'screens/AllTemplatesScreen/AllTemplatesScreen';
import { DashboardStackParamsList } from 'navigation/types';

const Stack = createStackNavigator<DashboardStackParamsList>();

//  TODO - create a header map !!

export const DashboardStack = () => {
  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName={DASHBOARD_SCREEN}>
      <Screen
        name={DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Screen name={ALL_TEMPLATES_SCREEN} component={AllTemplatesScreen} />
    </Navigator>
  );
};
