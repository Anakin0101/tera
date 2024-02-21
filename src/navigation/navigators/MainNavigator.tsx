import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { INITIAL_STACK, MODAL_STACK } from 'navigation/ScreenNames';
import { hideHeader } from 'navigation/config';
import { MainStackParamsList } from 'navigation/types';
import { ModalNavigator } from 'navigation/stacks/ModalStack';
import { useMainNavigator } from 'hooks';

import { Colors } from 'theme/Variables';
import { TabNavigator } from './TabNavigator';
import { HeaderBackArrow } from 'components/index';
import { useStyleTheme } from 'navigation/Navigation.styles';

const RootStack = createStackNavigator<MainStackParamsList>();

export const MainNavigator = () => {
  const { Navigator, Screen } = RootStack;
  useMainNavigator();
  const st = useStyleTheme();

  return (
    <Navigator
      initialRouteName={INITIAL_STACK}
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
      <Screen name={INITIAL_STACK} component={TabNavigator} options={hideHeader} />
      <Screen name={MODAL_STACK} component={ModalNavigator} options={hideHeader} />
    </Navigator>
  );
};
