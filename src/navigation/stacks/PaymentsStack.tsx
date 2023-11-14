import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PaymentsScreen } from 'screens';
import { useTranslation } from 'react-i18next';
import { PAYMENTS_SCREEN } from 'navigation/ScreenNames';

export type PaymentsStackParamList = {
  PaymentsScreen: undefined;
};

const Stack = createStackNavigator<PaymentsStackParamList>();

export const PaymentsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
  return (
    <Navigator initialRouteName={PAYMENTS_SCREEN}>
      <Screen
        name={PAYMENTS_SCREEN}
        component={PaymentsScreen}
        options={{
          title: t('common:navigation.payments'),
          headerTitleAlign: 'left',
        }}
      />
    </Navigator>
  );
};
