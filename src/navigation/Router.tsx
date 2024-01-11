import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { GuestNavigator } from './navigators/GuestNavigator';
import { MainNavigator } from './navigators/MainNavigator';
import { RoutesList } from './types';
import { AUTH_LOADING_SCREEN, GUEST_NAVIGATOR, MAIN_NAVIGATOR } from './ScreenNames';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen/AuthLoadingScreen';

const Stack = createStackNavigator<RoutesList>();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        gestureEnabled: false,
      })}
      initialRouteName={AUTH_LOADING_SCREEN}
    >
      <Stack.Screen
        name={AUTH_LOADING_SCREEN}
        component={AuthLoadingScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name={GUEST_NAVIGATOR}
        component={GuestNavigator}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name={MAIN_NAVIGATOR}
        component={MainNavigator}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
