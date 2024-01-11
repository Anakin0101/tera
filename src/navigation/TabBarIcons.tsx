import React from 'react';
import {
  TabBarHome,
  TabBarHomeActive,
  TabBarPayments,
  TabBarPaymentsActive,
  TabBarProducts,
  TabBarProductsActive,
  TabBarProfile,
  TabBarProfileActive,
  TabBarTransactions,
  TabBarTransactionsActive,
} from 'assets/SVGs/index';
import { verticalScale } from 'utils/config';

export const HomeStackIcon = ({ focused }: { focused: boolean }) =>
  focused ? <TabBarHomeActive /> : <TabBarHome />;

export const ProductsStackIcon = ({ focused }: { focused: boolean }) =>
  focused ? <TabBarProductsActive /> : <TabBarProducts />;

export const TransactionsStackIcon = ({ focused }: { focused: boolean }) =>
  focused ? (
    <TabBarTransactionsActive
      style={{
        marginTop: verticalScale(16),
      }}
    />
  ) : (
    <TabBarTransactions
      style={{
        marginTop: verticalScale(16),
      }}
    />
  );

export const PaymentsStackIcon = ({ focused }: { focused: boolean }) =>
  focused ? <TabBarPaymentsActive /> : <TabBarPayments />;

export const ProfileStackIcon = ({ focused }: { focused: boolean }) =>
  focused ? <TabBarProfileActive /> : <TabBarProfile />;
