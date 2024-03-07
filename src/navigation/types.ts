import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  AUTHORIZATION_METHODS_SCREEN,
  DASHBOARD_SCREEN,
  ONBOARDING_SCREEN,
  PASSCODE_LOGIN_SCREEN,
  PASSWORD_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
  PAYMENTS_STACK,
  PRODUCTS_STACK,
  PRODUCTS_SCREEN,
  PROFILE_SCREEN,
  TRANSACTIONS_SCREEN,
  TRANSACTIONS_STACK,
  HOME_STACK,
  INITIAL_STACK,
  ALL_TEMPLATES_SCREEN,
  MODAL_STACK,
  MY_ACCOUNTS_SCREEN,
  ALL_ACCOUNTS_AND_CARDS_SCREEN,
  ACCOUNT_DETAILS_SCREEN,
  MY_ACCOUNT_SCROLLABLE_SCREEN,
  CARD_DETAILS_SCREEN,
  CARD_INSURANCE,
  INSURANCE_PACKAGE_DETAILS,
  DEPOSITS_SCREEN,
  DEPOSIT_DETAILS_SCREEN,
  LOANS_SCREEN,
  LOAN_DETAILS_SCREEN,
  TO_ACCOUNT_SCREEN,
  TRANSFER_TO_ACCOUNT_SCREEN,
  PRIVATE_TRANSACTION_SCREEN,
  TRANSFER_DETAIL_SCREEN,
  TRANSACTION_FINISHED_SCREEN,
  TRANSACTION_FAILED_SCREEN,
  SETTINGS_SCREEN,
  CREATE_PASSCODE_SCREEN,
  VERIFY_EASY_LOGIN_SCREEN,
  PROFILE_STACK,
  ALL_TRANSACTIONS_SCREEN,
  TRANSACTION_DETAILS_SCREEN,
  OTHER_BANK_TANSACTION_SCREEN,
  TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN,
  NEW_DEPOSIT_DETAILS_SCREEN,
  SELECT_DEPOSIT_SCREEN,
  NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN,
  NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN,
  NEW_DEPOSIT_SUMMARY_SCREEN,
  DEPOSIT_SUCCESS_SCREEN,
  TERA_WALLET_SCREEN,
  TERA_WALLET_PDF_SCREEN,
  TERA_WALLET_SUCCESS_SCREEN,
  AUTH_LOADING_SCREEN,
  GUEST_NAVIGATOR,
  MAIN_NAVIGATOR,
  LOAN_REQUEST_SCREEN,
  LOAN_AMOUNT_SCREEN,
  LOAN_REQUEST_TERMS_SCREEN,
  LOAN_REQUEST_ADDITIONAL_INFO_SCREEN,
  NEW_LOAN_DETAILS_SCREEN,
  LOAN_REQUEST_ACCEPTED_SCREEN,
  BUDGET_TRANSACTION_SCREEN,
  TRANSFER_TO_BUDGET,
  BUDGET_TRANSFER_DETAILS,
  NEW_PAYMENT_SCREEN,
  REGISTRATION_STACK,
  REGISTRATION_METHOD_SCREEN,
  VERIFICATION_TYPE_SCREEN,
  CODE_WORD_SCREEN,
  REGISTRATION_FINISH_SCREEN,
  ENTER_USERNAME_SCREEN,
  AUTOMATIC_PAYMENTS_SCREEN,
  AUTOMATIC_PAYMENT_DETAILS_SCREEN,
  NEW_AUTOMATIC_PAYMENT_SCREEN,
  CHOOSE_PAYMENT_PROVIDER_SCREEN,
  CHECK_PAYMENT_PROVIDER_SCREEN,
  CARD_ORDER_TYPE_SCREEN,
  CARD_ORDER_CHOOSE_CARD_SCREEN,
  CARD_ORDER_CHOSEN_CARD_SCREEN,
  CARD_ORDER_CHOOSE_IBAN_SCREEN,
  CARD_ORDER_CHOOSE_ADDRESS_SCREEN,
  CARD_ORDER_DETAILS_SCREEN,
  TARIFF_PACKAGES_SCREEN,
  PAYMENT_DETAILS_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
  PAYMENTS_SCREEN,
  CHOOSE_MOBILE_PROVIDER_SCREEN,
  NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN,
  PAYMENT_ERROR_SCREEN,
  FOREIGN_IBAN_SCREEN,
  CHOOSE_PAYMENT_ACCOUNT_SCREEN,
  ADD_CART_SCREEN,
  CART_LIST_SCREEN,
  CART_PAYMENT_LIST_SCREEN,
  CART_PAYMENT_SUCCESS_SCREEN,
  TARIFF_PACKAGES_SINGLE_SCREEN,
  MONEY_TRANSFERS_SCREEN,
  MONEY_TRANSFER_RECEIVE_SCREEN,
  CHECK_MONEY_TRANSFER_PROVIDER_SCREEN,
} from './ScreenNames';
import {
  ProvidersGroup,
  Provider,
  DebtVerifyResult,
  DebtVerifyBasketResponse,
  Basket,
  PaymentResult,
  ProviderItemProps,
  // FeeRule,
} from 'services/apis/paymentsAPI/paymentsAPI.types';
import { Account, CustomerPackages } from 'services/apis/productsAPI/productsAPI.types';
import { SubscriberFieldsValue } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen.types';
import { AutomaticPaymentForm } from 'screens/NewAutomaticPaymentScreen/NewAutomaticPaymentScreen.types';
import { MTSystemItemProps } from 'utils/moneyTransfer';

export type RoutesList = {
  [AUTH_LOADING_SCREEN]: undefined;
  [GUEST_NAVIGATOR]: {
    screen: keyof GuestStackParamList;
  };
  [MAIN_NAVIGATOR]: {
    screen: keyof MainStackParamsList;
  };
};

export type MainStackParamsList = {
  [INITIAL_STACK]: NavigatorScreenParams<TabParamList>;
  [MODAL_STACK]: NavigatorScreenParams<ModalStackParamsList>;
};

export type ModalStackParamsList = {
  [SETTINGS_SCREEN]: undefined;
  [AUTHORIZATION_METHODS_SCREEN]: undefined;
  [CREATE_PASSCODE_SCREEN]: undefined;
  [VERIFY_EASY_LOGIN_SCREEN]: undefined;
  [NEW_PAYMENT_SCREEN]: undefined | { isAutomaticPayment?: boolean; basket?: Basket };
  [CHECK_PAYMENT_PROVIDER_SCREEN]: {
    providerItem: Provider;
    isAutomaticPayment?: boolean;
    basket?: Basket;
  };
  [CHOOSE_PAYMENT_PROVIDER_SCREEN]: {
    providerInfo?: ProvidersGroup;
    isAutomaticPayment?: boolean;
    isParkingAndFines?: boolean;
    basket?: Basket;
  };
  [PAYMENT_DETAILS_SCREEN]: {
    providerItem: Provider;
    debtVerifyResults: Array<DebtVerifyResult>;
    selectedAccount: Account;
    subscriberFieldsValue: SubscriberFieldsValue;
    subscriberInputFieldsValue: SubscriberFieldsValue;
    debtVerifyBasketInfo?: Array<DebtVerifyBasketResponse>;
  };
  [CHOOSE_MOBILE_PROVIDER_SCREEN]: undefined;
  [PAYMENT_SUCCESS_SCREEN]: {
    providerItem?: Provider;
    subscriberInputFieldsValue?: SubscriberFieldsValue;
    amount?: number;
    isBasketMode?: boolean;
  };
  [CHOOSE_PAYMENT_ACCOUNT_SCREEN]: {
    providerItem: Provider;
    debtVerifyResults: Array<DebtVerifyResult>;
    subscriberFieldsValue: SubscriberFieldsValue;
    debtVerifyBasketInfo?: Array<DebtVerifyBasketResponse>;
  };
  [AUTOMATIC_PAYMENTS_SCREEN]: undefined;
  [AUTOMATIC_PAYMENT_DETAILS_SCREEN]: {
    id: number;
    imageId: string;
  };
  [NEW_AUTOMATIC_PAYMENT_SCREEN]: {
    providerItem: Provider;
    debtVerifyResults: Array<DebtVerifyResult>;
    subscriberFieldsValue: SubscriberFieldsValue;
  };
  [NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN]: {
    providerItem: Provider;
    debtVerifyResults: Array<DebtVerifyResult>;
    automaticPaymentForm: AutomaticPaymentForm;
    subscriberFieldsValue: SubscriberFieldsValue;
  };
  [ADD_CART_SCREEN]: undefined | { basket: Basket; fromBasketDetails?: boolean };
  [CART_LIST_SCREEN]: undefined;
  [CART_PAYMENT_LIST_SCREEN]: {
    basket: Basket;
  };
  [CART_PAYMENT_SUCCESS_SCREEN]: {
    paymentResults: Array<PaymentResult>;
    sum: number;
    providerItems: Array<ProviderItemProps>;
  };
  [MONEY_TRANSFERS_SCREEN]: undefined;
  [MONEY_TRANSFER_RECEIVE_SCREEN]: undefined;
  [CHECK_MONEY_TRANSFER_PROVIDER_SCREEN]: {
    providerItem: MTSystemItemProps;
  };
  [PAYMENT_ERROR_SCREEN]: undefined;
  [ALL_TRANSACTIONS_SCREEN]: { accountNumber?: number } | undefined;
  [TRANSACTION_DETAILS_SCREEN]: undefined;
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
    index: number;
  };
  [CARD_DETAILS_SCREEN]: {
    iban: string;
    index: number;
    item: any;
  };
  [MY_ACCOUNT_SCROLLABLE_SCREEN]: {
    iban: string;
  };
  [CARD_INSURANCE]: {
    cardId: number;
  };
  [INSURANCE_PACKAGE_DETAILS]: {
    packageName: string;
    commission: number;
    cardId: number;
  };
  [DEPOSITS_SCREEN]: undefined;
  [DEPOSIT_DETAILS_SCREEN]: {
    index: number;
    id?: number;
  };
  [LOANS_SCREEN]: undefined;
  [LOAN_DETAILS_SCREEN]: {
    index: number;
  };
  [SELECT_DEPOSIT_SCREEN]: undefined;
  [NEW_DEPOSIT_DETAILS_SCREEN]: {
    id: number;
  };
  [NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN]: undefined;
  [NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN]: undefined;
  [NEW_DEPOSIT_SUMMARY_SCREEN]: undefined;
  [DEPOSIT_SUCCESS_SCREEN]: undefined;
  [TERA_WALLET_SCREEN]: undefined;
  [TERA_WALLET_PDF_SCREEN]: undefined;
  [TERA_WALLET_SUCCESS_SCREEN]: undefined;
  [LOAN_REQUEST_SCREEN]: undefined;
  [LOAN_AMOUNT_SCREEN]: undefined;
  [LOAN_REQUEST_TERMS_SCREEN]: undefined;
  [LOAN_REQUEST_ADDITIONAL_INFO_SCREEN]: undefined;
  [NEW_LOAN_DETAILS_SCREEN]: undefined;
  [LOAN_REQUEST_ACCEPTED_SCREEN]: undefined;
  [CARD_ORDER_TYPE_SCREEN]: undefined;
  [CARD_ORDER_CHOOSE_CARD_SCREEN]: undefined;
  [CARD_ORDER_CHOSEN_CARD_SCREEN]: undefined;
  [CARD_ORDER_CHOOSE_IBAN_SCREEN]: undefined;
  [CARD_ORDER_CHOOSE_ADDRESS_SCREEN]: undefined;
  [CARD_ORDER_DETAILS_SCREEN]: undefined;
  [TARIFF_PACKAGES_SCREEN]: undefined;
  [TARIFF_PACKAGES_SINGLE_SCREEN]: CustomerPackages;
};

export type TransactionsStackParamsList = {
  [TRANSACTIONS_SCREEN]: undefined;
  [MY_ACCOUNTS_SCREEN]: {
    otherBanks?: boolean;
    budget?: boolean;
  };
  [TRANSACTION_FAILED_SCREEN]: undefined;
  [TO_ACCOUNT_SCREEN]: {
    selected?: any;
    otherBanks?: any;
  };
  [BUDGET_TRANSACTION_SCREEN]: { selected?: any };
  [OTHER_BANK_TANSACTION_SCREEN]?:
    | {
        otherBanks?: boolean;
      }
    | undefined;
  [TRANSFER_TO_ACCOUNT_SCREEN]: {
    fromOtherBank?: any;
    fromMobile?: boolean;
    receiver?: string;
    fromIban?: boolean;
    fromPersonal?: boolean;
  };
  [PRIVATE_TRANSACTION_SCREEN]: {
    from: any;
    transactionParam?: string;
  };
  [TRANSFER_DETAIL_SCREEN]: {
    convertion?: boolean;
    fromOtherBank?: boolean;
    mobileTransaction?: boolean;
    budgetTransaction?: boolean;
    receiver?: string;
  };
  [TRANSACTION_FINISHED_SCREEN]:
    | undefined
    | {
        convertion?: boolean;
        internal?: boolean;
        fromIban?: boolean;
        mobileTransaction?: boolean;
        budgetTransaction?: boolean;
      };

  [TRANSFER_TO_BUDGET]:
    | undefined
    | {
        treasury?: {
          a: string;
          b: string;
          c: string;
        };
      }
    | { budgetCode: string };

  [BUDGET_TRANSFER_DETAILS]: undefined;
  [FOREIGN_IBAN_SCREEN]: undefined;

  [TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN]: {
    fromOtherBank?: boolean;
    fromMobile?: boolean;
    receiver?: string;
    fromIban?: boolean;
    fromPersonal?: boolean;
  };
};

export type PaymentsStackParamsList = {
  [PAYMENTS_SCREEN]: undefined;
};

export type ProfileStackParamsList = {
  [PROFILE_SCREEN]: undefined;
};

export type GuestStackParamList = {
  [ONBOARDING_SCREEN]: undefined;
  [PASSWORD_LOGIN_SCREEN]: undefined;
  [PASSWORD_ONLY_LOGIN_SCREEN]: undefined;
  [PASSCODE_LOGIN_SCREEN]: undefined;
  [REGISTRATION_STACK]: NavigatorScreenParams<RegistrationStackParamsList>;
};

export type RegistrationStackParamsList = {
  [REGISTRATION_METHOD_SCREEN]: undefined;
  [VERIFICATION_TYPE_SCREEN]: undefined;
  [CODE_WORD_SCREEN]: undefined;
  [ENTER_USERNAME_SCREEN]: undefined;
  [REGISTRATION_FINISH_SCREEN]:
    | {
        isSuccess?: boolean;
      }
    | undefined;
};

export type TabParamList = {
  [HOME_STACK]: NavigatorScreenParams<DashboardStackParamsList>;
  [PRODUCTS_STACK]: NavigatorScreenParams<ProductsStackParamsList>;
  [TRANSACTIONS_STACK]: NavigatorScreenParams<TransactionsStackParamsList>;
  [PAYMENTS_STACK]: NavigatorScreenParams<PaymentsStackParamsList>;
  [PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamsList>;
};

export type MainParamsList = MainStackParamsList &
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

export type TransactionsStackRouteProps<RouteName extends keyof TransactionsStackParamsList> =
  RouteProp<TransactionsStackParamsList, RouteName>;

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

// Registration stack intellisense
export type RegistrationStackScreenProps<T extends keyof RegistrationStackParamsList> =
  StackNavigationProp<RegistrationStackParamsList, T>;

export type RegistrationStackRouteProps<T extends keyof RegistrationStackParamsList> = RouteProp<
  RegistrationStackParamsList,
  T
>;

// Main stack intellisense - for all authorized user stacks
export type MainStackScreenProps<T extends keyof MainParamsList> = StackNavigationProp<
  MainParamsList,
  T
>;

export type MainStackRouteProps<T extends keyof MainParamsList> = RouteProp<MainParamsList, T>;

export type RoutesGenericProp<T extends keyof RoutesList & string> = StackNavigationProp<
  RoutesList,
  T
>;
