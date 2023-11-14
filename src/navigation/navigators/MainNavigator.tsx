import React from 'react';
import { View } from 'react-native';
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
  HOME_STACK,
  INITIAL_STACK,
  MODAL_STACK,
  PAYMENTS_STACK,
  PRODUCTS_STACK,
  PROFILE_STACK,
  TRANSACTIONS_STACK,
} from 'navigation/ScreenNames';
import { hideHeader, presentationModal, tabOptions } from 'navigation/config';
import { MainStackParamsList, TabParamList } from 'navigation/types';
import { ModalNavigator } from 'navigation/stacks/ModalStack';
import { useMainNavigator } from 'hooks/useMainNavigator';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setShouldCloseCards } from 'store/slices/dashboard';

const transactionsIcon = () => (
  <View
    style={{
      width: 40,
      height: 40,
      marginTop: 20,
      borderRadius: 20,
      backgroundColor: '#f9f1f6',
    }}
  />
);

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
        options={{ title: t('common:navigation.home') }}
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
        options={{ title: t('common:navigation.products') }}
      />
      <Screen
        name={TRANSACTIONS_STACK}
        component={TransactionsStack}
        options={{
          title: '',
          tabBarIcon: transactionsIcon,
        }}
      />
      <Screen
        name={PAYMENTS_STACK}
        component={PaymentsStack}
        options={{ title: t('common:navigation.payments') }}
      />
      <Screen
        name={PROFILE_STACK}
        component={ProfileNavigator}
        options={{ title: t('common:navigation.more') }}
      />
    </Navigator>
  );
};

export const MainNavigator = () => {
  const { Navigator, Screen, Group } = RootStack;
  useMainNavigator();

  return (
    <Navigator initialRouteName={INITIAL_STACK} screenOptions={hideHeader}>
      <Group>
        <Screen name={INITIAL_STACK} component={TabNavigator} options={hideHeader} />
      </Group>
      <Group screenOptions={presentationModal}>
        <Screen name={MODAL_STACK} component={ModalNavigator} />
      </Group>
    </Navigator>
  );
};
