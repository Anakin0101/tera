import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from 'screens';
import { PROFILE_SCREEN } from 'navigation/ScreenNames';

import { ProfileStackParamsList } from 'navigation/types';
import { Colors } from 'theme/Variables';
import { HeaderBackArrow } from 'components/HeaderBackArrow/HeaderBackArrow';
import { useStyleTheme } from 'navigation/Navigation.styles';

const ProfileStack = createStackNavigator<ProfileStackParamsList>();

export const ProfileNavigator = () => {
  const { Navigator, Screen } = ProfileStack;
  const st = useStyleTheme();
  return (
    <Navigator
      initialRouteName={PROFILE_SCREEN}
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
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};
