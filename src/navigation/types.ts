import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import {
  AUTHORIZATION_METHODS_SCREEN,
  CREATE_PASSCODE_SCREEN,
  DASHBOARD_SCREEN,
  ONBOARDING_SCREEN,
  PASSCODE_LOGIN_SCREEN,
  PASSWORD_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
  PAYMENTS_STACK,
  PRODUCTS_STACK,
  PRODUCTS_SCREEN,
  PROFILE_SCREEN,
  PROFILE_STACK,
  SETTINGS_SCREEN,
  TRANSACTIONS_SCREEN,
  TRANSACTIONS_STACK,
  HOME_STACK,
  INITIAL_STACK,
  ALL_TEMPLATES_SCREEN,
  MODAL_STACK,
  MODAL_SCREEN_ONE,
  MY_ACCOUNTS_SCREEN,
  ALL_ACCOUNTS_AND_CARDS_SCREEN,
  ACCOUNT_DETAILS_SCREEN,
  MY_ACCOUNT_SCROLLABLE_SCREEN,
} from './ScreenNames';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainStackParamsList = {
  [INITIAL_STACK]: undefined;
  [MODAL_STACK]: NavigatorScreenParams<ModalStackParamsList>;
};

export type ModalStackParamsList = {
  [MODAL_SCREEN_ONE]: undefined;
};

export type DashboardStackParamsList = {
  [DASHBOARD_SCREEN]: undefined;
  [ALL_TEMPLATES_SCREEN]: undefined;
};

export type ProductsStackParamsList = {
  [PRODUCTS_SCREEN]: undefined;
  [ALL_ACCOUNTS_AND_CARDS_SCREEN]: undefined;
  [ACCOUNT_DETAILS_SCREEN]: {
    iban: string;
  };
  [MY_ACCOUNT_SCROLLABLE_SCREEN]: undefined;
};

export type TransactionsStackParamsList = {
  [TRANSACTIONS_SCREEN]: undefined;
  [MY_ACCOUNTS_SCREEN]: undefined;
};

export type PaymentsStackParamsList = {};

export type ProfileStackParamsList = {
  [PROFILE_SCREEN]: undefined;
  [SETTINGS_SCREEN]: undefined;
  [AUTHORIZATION_METHODS_SCREEN]: undefined;
  [CREATE_PASSCODE_SCREEN]: undefined;
  [PASSCODE_LOGIN_SCREEN]: undefined;
};

export type GuestStackParamList = {
  [ONBOARDING_SCREEN]: undefined;
  [PASSWORD_LOGIN_SCREEN]: undefined;
  [PASSWORD_ONLY_LOGIN_SCREEN]: undefined;
  [PASSCODE_LOGIN_SCREEN]: undefined;
};

export type TabParamList = {
  [HOME_STACK]: NavigatorScreenParams<DashboardStackParamsList>;
  [PRODUCTS_STACK]: NavigatorScreenParams<ProductsStackParamsList>;
  [TRANSACTIONS_STACK]: NavigatorScreenParams<TransactionsStackParamsList>;
  [PAYMENTS_STACK]: NavigatorScreenParams<PaymentsStackParamsList>;
  [PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamsList>;
};

export type MainNavigatorParams = MainStackParamsList &
  ModalStackParamsList &
  DashboardStackParamsList &
  ProductsStackParamsList &
  TransactionsStackParamsList &
  PaymentsStackParamsList &
  ProfileStackParamsList &
  TabParamList;

// Home stack intellisense
export type DashboardStackScreenProps<T extends keyof DashboardStackParamsList> =
  StackNavigationProp<DashboardStackParamsList, T>;

export type DashboardStackRouteProps<T extends keyof DashboardStackParamsList> = RouteProp<
  DashboardStackParamsList,
  T
>;

// PRODUCTS stack intellisense
export type ProductsStackScreenProps<T extends keyof ProductsStackParamsList> = StackNavigationProp<
  ProductsStackParamsList,
  T
>;

export type ProductsStackRouteProps<T extends keyof ProductsStackParamsList> = RouteProp<
  ProductsStackParamsList,
  T
>;

// TRANSACTIONS stack intellisense
export type TransactionsStackScreenProps<T extends keyof TransactionsStackParamsList> =
  StackNavigationProp<TransactionsStackParamsList, T>;

export type TransactionsStackRouteProps<T extends keyof TransactionsStackParamsList> = RouteProp<
  TransactionsStackParamsList,
  T
>;

// PAYMENTS stack intellisense
export type PaymentsStackScreenProps<T extends keyof PaymentsStackParamsList> = StackNavigationProp<
  PaymentsStackParamsList,
  T
>;

export type PaymentsStackRouteProps<T extends keyof PaymentsStackParamsList> = RouteProp<
  PaymentsStackParamsList,
  T
>;

// PROFILE stack intellisense
export type ProfileStackScreenProps<T extends keyof ProfileStackParamsList> = StackNavigationProp<
  ProfileStackParamsList,
  T
>;

export type ProfileStackRouteProps<T extends keyof ProfileStackParamsList> = RouteProp<
  ProfileStackParamsList,
  T
>;

// Guest stack intellisense
export type GuestStackScreenProps<T extends keyof GuestStackParamList> = StackNavigationProp<
  GuestStackParamList,
  T
>;

export type GuestStackRouteProps<T extends keyof GuestStackParamList> = RouteProp<
  GuestStackParamList,
  T
>;

// Modal stack intellisense
export type ModalStackScreenProps<T extends keyof ModalStackParamsList> = StackNavigationProp<
  ModalStackParamsList,
  T
>;

export type ModalStackRouteProps<T extends keyof ModalStackParamsList> = RouteProp<
  ModalStackParamsList,
  T
>;

// Main stack intellisense - for all authorized user stacks
export type MainNavigationProps<T extends keyof MainNavigatorParams> = StackNavigationProp<
  MainNavigatorParams,
  T
>;

export type MainRouteProps<T extends keyof MainNavigatorParams> = RouteProp<MainNavigatorParams, T>;
