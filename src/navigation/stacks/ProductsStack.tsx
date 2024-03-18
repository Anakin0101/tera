import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { ProductsScreen } from 'screens';
import { PRODUCTS_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackParamsList } from 'navigation/types';
import { Colors } from 'theme/Variables';
import { hideHeader } from 'navigation/config';
import { HeaderBackArrow } from 'components';
import { useStyleTheme } from 'navigation/Navigation.styles';

const Stack = createStackNavigator<ProductsStackParamsList>();

export const ProductsStack = () => {
  const { Navigator, Screen } = Stack;
  const st = useStyleTheme();

  return (
    <Navigator
      initialRouteName={PRODUCTS_SCREEN}
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
      <Screen name={PRODUCTS_SCREEN} component={ProductsScreen} options={hideHeader} />
    </Navigator>
  );
};
