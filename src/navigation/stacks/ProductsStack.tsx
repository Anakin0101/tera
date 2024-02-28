import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {
  AccountDetailsScreen,
  AllAcountsAndCardsScreen,
  MyAccountsScrollableScreen,
  ProductsScreen,
  CardDetailsScreen,
  InsurancePackageDetails,
  DepositsScreen,
  DepositDetailsScreen,
  LoanDetailsScreen,
  NewDepositDetailsScreen,
  DepositSuccessScreen,
  NewDepositInitialAmountScreen,
  NewDepositAdditionalInfoScreen,
  NewDepositSummaryScreen,
  TeraWalletScreen,
  TeraWalletPDFScreen,
  TeraWalletSuccess,
  LoanRequestScreen,
  LoanAmountScreen,
  LoanRequestTermsScreen,
  LoanRequestAdditionalInfo,
  NewLoanDetailsScreen,
  LoanRequestAcceptedScreen,
  CardOrderTypeScreen,
  CardOrderChooseCardScreen,
  CardOrderChosenCardScreen,
  CardOrderChooseIbanScreen,
  CardOrderChooseAddressScreen,
  CardOrderDetailsScreen,
} from 'screens';
import { useTranslation } from 'react-i18next';
import {
  ACCOUNT_DETAILS_SCREEN,
  ALL_ACCOUNTS_AND_CARDS_SCREEN,
  CARD_DETAILS_SCREEN,
  CARD_INSURANCE,
  DEPOSITS_SCREEN,
  DEPOSIT_DETAILS_SCREEN,
  INSURANCE_PACKAGE_DETAILS,
  LOANS_SCREEN,
  LOAN_DETAILS_SCREEN,
  MY_ACCOUNT_SCROLLABLE_SCREEN,
  NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN,
  NEW_DEPOSIT_DETAILS_SCREEN,
  NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN,
  NEW_DEPOSIT_SUMMARY_SCREEN,
  DEPOSIT_SUCCESS_SCREEN,
  PRODUCTS_SCREEN,
  SELECT_DEPOSIT_SCREEN,
  TERA_WALLET_SCREEN,
  TERA_WALLET_PDF_SCREEN,
  TERA_WALLET_SUCCESS_SCREEN,
  LOAN_REQUEST_SCREEN,
  LOAN_AMOUNT_SCREEN,
  LOAN_REQUEST_TERMS_SCREEN,
  LOAN_REQUEST_ADDITIONAL_INFO_SCREEN,
  NEW_LOAN_DETAILS_SCREEN,
  LOAN_REQUEST_ACCEPTED_SCREEN,
  CARD_ORDER_TYPE_SCREEN,
  CARD_ORDER_CHOOSE_CARD_SCREEN,
  CARD_ORDER_CHOSEN_CARD_SCREEN,
  CARD_ORDER_CHOOSE_IBAN_SCREEN,
  CARD_ORDER_CHOOSE_ADDRESS_SCREEN,
  CARD_ORDER_DETAILS_SCREEN,
  TARIFF_PACKAGES_SCREEN,
  TARIFF_PACKAGES_SINGLE_SCREEN,
} from 'navigation/ScreenNames';
import { ProductsStackParamsList } from 'navigation/types';
import { CardInsuranceScreen } from 'screens/CardInsuranceScreen/CardInsuranceScreen';
import { LoansScreen } from 'screens/LoansScreen/LoansScreen';
import { Colors } from 'theme/Variables';
import { SelectDepositScreen } from 'screens/SelectDepositScreen/SelectDepositScreen';
import { guestNavOptions, hideHeader } from 'navigation/config';
import { HeaderBackArrow } from 'components/index';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { TariffPackagesListScreen } from 'screens/TariffPackagesListScreen/TariffPackagesListScreen';
import { TariffPackagesSingleScreen } from 'screens/TariffPackagesSingleScreen/TariffPackagesSingleScreen';
import { withActivityTimeout } from 'components/HOC';

const Stack = createStackNavigator<ProductsStackParamsList>();

export const ProductsStack = () => {
  const { Navigator, Screen } = Stack;
  const { t } = useTranslation();
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
      <Screen
        name={PRODUCTS_SCREEN}
        component={withActivityTimeout(ProductsScreen)}
        options={hideHeader}
      />
      <Screen
        name={ALL_ACCOUNTS_AND_CARDS_SCREEN}
        component={withActivityTimeout(AllAcountsAndCardsScreen)}
        options={{
          title: t('products.allAccounts'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={ACCOUNT_DETAILS_SCREEN}
        component={withActivityTimeout(AccountDetailsScreen)}
        options={{ title: t('products.accountDetails') }}
      />
      <Screen
        name={MY_ACCOUNT_SCROLLABLE_SCREEN}
        component={withActivityTimeout(MyAccountsScrollableScreen)}
        options={
          {
            // TODO - add translation
          }
        }
      />
      <Screen
        name={CARD_DETAILS_SCREEN}
        component={withActivityTimeout(CardDetailsScreen)}
        options={{ title: t('products.cardDetails') }}
      />
      <Screen
        name={CARD_INSURANCE}
        component={withActivityTimeout(CardInsuranceScreen)}
        options={{ title: t('products.cardInsurance') }}
      />
      <Screen
        name={INSURANCE_PACKAGE_DETAILS}
        component={withActivityTimeout(InsurancePackageDetails)}
        options={{ title: t('products.insurancePackageDetails') }}
      />
      <Screen
        name={DEPOSITS_SCREEN}
        component={withActivityTimeout(DepositsScreen)}
        options={{ title: t('products.allDeposits'), headerStyle: st.whiteHeader }}
      />
      <Screen
        name={DEPOSIT_DETAILS_SCREEN}
        component={withActivityTimeout(DepositDetailsScreen)}
        options={{ title: t('products.depositDetails') }}
      />
      <Screen name={LOANS_SCREEN} component={LoansScreen} options={{ title: t('loans.title') }} />
      <Screen
        name={LOAN_DETAILS_SCREEN}
        component={withActivityTimeout(LoanDetailsScreen)}
        options={{ title: t('loans.details') }}
      />
      <Screen
        name={SELECT_DEPOSIT_SCREEN}
        component={withActivityTimeout(SelectDepositScreen)}
        options={{
          title: t('newDeposit.activateDeposit'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_DEPOSIT_DETAILS_SCREEN}
        component={withActivityTimeout(NewDepositDetailsScreen)}
        options={{
          title: t('newDeposit.activateDeposit'),
          headerStyle: st.whiteHeader,
        }}
      />

      <Screen
        name={NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN}
        component={withActivityTimeout(NewDepositInitialAmountScreen)}
        options={{
          title: t('newDeposit.initialAmount'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_DEPOSIT_ADDITIONAL_INFO_SCREEN}
        component={withActivityTimeout(NewDepositAdditionalInfoScreen)}
        options={{ title: t('newDeposit.additionalInfo') }}
      />
      <Screen
        name={NEW_DEPOSIT_SUMMARY_SCREEN}
        component={withActivityTimeout(NewDepositSummaryScreen)}
        options={{ title: t('newDeposit.details') }}
      />
      <Screen
        name={DEPOSIT_SUCCESS_SCREEN}
        component={withActivityTimeout(DepositSuccessScreen)}
        options={guestNavOptions}
      />
      <Screen
        name={TERA_WALLET_SCREEN}
        component={withActivityTimeout(TeraWalletScreen)}
        options={{
          title: t('newDeposit.teraWallet'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={TERA_WALLET_PDF_SCREEN}
        component={withActivityTimeout(TeraWalletPDFScreen)}
        options={hideHeader}
      />
      <Screen
        name={TERA_WALLET_SUCCESS_SCREEN}
        component={withActivityTimeout(TeraWalletSuccess)}
        options={guestNavOptions}
      />
      <Screen
        name={LOAN_REQUEST_SCREEN}
        component={withActivityTimeout(LoanRequestScreen)}
        options={{
          title: t('loanRequest.creditProducts'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={LOAN_AMOUNT_SCREEN}
        component={withActivityTimeout(LoanAmountScreen)}
        options={{
          title: t('loanRequest.amount'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={LOAN_REQUEST_TERMS_SCREEN}
        component={withActivityTimeout(LoanRequestTermsScreen)}
        options={{
          title: t('loanRequest.readTerms'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={LOAN_REQUEST_ADDITIONAL_INFO_SCREEN}
        component={withActivityTimeout(LoanRequestAdditionalInfo)}
        options={{
          title: t('loanRequest.additional'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={NEW_LOAN_DETAILS_SCREEN}
        component={withActivityTimeout(NewLoanDetailsScreen)}
        options={{ title: t('loanRequest.details') }}
      />
      <Screen
        name={LOAN_REQUEST_ACCEPTED_SCREEN}
        component={withActivityTimeout(LoanRequestAcceptedScreen)}
        options={guestNavOptions}
      />
      <Screen
        name={CARD_ORDER_TYPE_SCREEN}
        component={withActivityTimeout(CardOrderTypeScreen)}
        options={{
          title: t('products.type'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOOSE_CARD_SCREEN}
        component={withActivityTimeout(CardOrderChooseCardScreen)}
        options={{
          title: t('products.plasticCard'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOSEN_CARD_SCREEN}
        component={withActivityTimeout(CardOrderChosenCardScreen)}
        options={{
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOOSE_IBAN_SCREEN}
        component={withActivityTimeout(CardOrderChooseIbanScreen)}
        options={{
          title: t('products.account'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_CHOOSE_ADDRESS_SCREEN}
        component={withActivityTimeout(CardOrderChooseAddressScreen)}
        options={{
          title: t('products.branch'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={CARD_ORDER_DETAILS_SCREEN}
        component={withActivityTimeout(CardOrderDetailsScreen)}
        options={{
          title: t('products.cardDetails'),
          headerStyle: st.whiteHeader,
        }}
      />
      <Screen
        name={TARIFF_PACKAGES_SCREEN}
        component={withActivityTimeout(TariffPackagesListScreen)}
        options={{ title: t('newDeposit.tariffPackages') }}
      />
      <Screen
        name={TARIFF_PACKAGES_SINGLE_SCREEN}
        component={withActivityTimeout(TariffPackagesSingleScreen)}
        options={{ title: t('newDeposit.tariffPackages') }}
      />
    </Navigator>
  );
};
