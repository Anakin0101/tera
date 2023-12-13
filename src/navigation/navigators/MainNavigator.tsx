import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DashboardStack,
  PaymentsStack,
  TransactionsStack,
  ProductsStack,
  ProfileNavigator,
} from 'navigation/stacks';
import {
  ALL_TRANSACTIONS_SCREEN,
  HOME_STACK,
  INITIAL_STACK,
  MODAL_STACK,
  PAYMENTS_STACK,
  PRODUCTS_STACK,
  PROFILE_STACK,
  TRANSACTIONS_STACK,
} from 'navigation/ScreenNames';
import { hideHeader, tabOptions } from 'navigation/config';
import { MainStackParamsList, TabParamList } from 'navigation/types';
import { ModalNavigator } from 'navigation/stacks/ModalStack';
import { useMainNavigator } from 'hooks';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setShouldCloseCards } from 'store/slices/dashboard';
import {
  HomeStackIcon,
  PaymentsStackIcon,
  ProductsStackIcon,
  ProfileStackIcon,
  TransactionsStackIcon,
} from 'navigation/TabBarIcons';
import { AllTransactionsScreen } from 'screens';
import { Colors, FontFamily } from 'theme/Variables';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createStackNavigator<MainStackParamsList>();

const TabNavigator = () => {
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

export const MainNavigator = () => {
  const { t } = useTranslation();
  const { Navigator, Screen } = RootStack;
  useMainNavigator();

  return (
    <Navigator initialRouteName={INITIAL_STACK}>
      <Screen name={INITIAL_STACK} component={TabNavigator} options={hideHeader} />
      <Screen name={MODAL_STACK} component={ModalNavigator} />
      <Screen
        name={ALL_TRANSACTIONS_SCREEN}
        component={AllTransactionsScreen}
        options={{
          title: t('transactions.title'),
          headerStyle: {
            backgroundColor: Colors.defaultBackground,
            shadowColor: 'transparent',
          },
          headerBackTitleVisible: false,
          headerTitleStyle: { fontFamily: FontFamily.Regular },
        }}
      />
    </Navigator>
  );
};
