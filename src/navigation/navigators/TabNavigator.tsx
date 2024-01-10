import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DashboardStack,
  PaymentsStack,
  TransactionsStack,
  ProductsStack,
  ProfileNavigator,
} from 'navigation/stacks';
import {
  HOME_STACK,
  PAYMENTS_STACK,
  PRODUCTS_STACK,
  PROFILE_STACK,
  TRANSACTIONS_STACK,
} from 'navigation/ScreenNames';
import { tabOptions } from 'navigation/config';
import { TabParamList } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setShouldCloseCards } from 'store/slices/dashboard';
import {
  HomeStackIcon,
  PaymentsStackIcon,
  ProductsStackIcon,
  ProfileStackIcon,
  TransactionsStackIcon,
} from 'navigation/TabBarIcons';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { Navigator, Screen } = Tab;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Navigator screenOptions={tabOptions}>
      <Screen
        name={HOME_STACK}
        component={DashboardStack}
        options={{
          title: t('common:navigation.home'),
          tabBarIcon: HomeStackIcon,
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            const { isFocused, state, goBack } = navigation;
            if (isFocused()) {
              if (navigation.canGoBack()) {
                for (let i = 0; i < state.routes.length - 1; i += 1) {
                  goBack();
                }
              } else {
                dispatch(setShouldCloseCards(true));
              }
            } else {
              navigation.navigate(HOME_STACK);
            }
          },
        })}
      />
      <Screen
        name={PRODUCTS_STACK}
        component={ProductsStack}
        options={{ title: t('common:navigation.products'), tabBarIcon: ProductsStackIcon }}
      />
      <Screen
        name={TRANSACTIONS_STACK}
        component={TransactionsStack}
        options={{
          title: '',
          tabBarIcon: TransactionsStackIcon,
        }}
      />
      <Screen
        name={PAYMENTS_STACK}
        component={PaymentsStack}
        options={{ title: t('common:navigation.payments'), tabBarIcon: PaymentsStackIcon }}
      />
      <Screen
        name={PROFILE_STACK}
        component={ProfileNavigator}
        options={{ title: t('common:navigation.more'), tabBarIcon: ProfileStackIcon }}
      />
    </Navigator>
  );
};
