import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { AutomaticPaymentsScreen, PaymentsScreen } from 'screens';
import { AUTOMATIC_PAYMENTS_SCREEN, PAYMENTS_SCREEN } from 'navigation/ScreenNames';
import { HeaderBackArrow } from 'components/HeaderBackArrow/HeaderBackArrow';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { Colors } from 'theme/Variables';
import { PaymentsStackParamsList } from 'navigation/types';
import { hideHeader } from 'navigation/config';

const Stack = createStackNavigator<PaymentsStackParamsList>();

export const PaymentsStack = () => {
  const { Navigator, Screen } = Stack;
  const st = useStyleTheme();
  const { t } = useTranslation();

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
      <Screen
        name={AUTOMATIC_PAYMENTS_SCREEN}
        component={AutomaticPaymentsScreen}
        options={{
          title: t('automaticPayments.title'),
          headerStyle: { backgroundColor: Colors.white },
        }}
      />
    </Navigator>
  );
};
