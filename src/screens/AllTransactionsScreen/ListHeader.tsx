import React, { FC, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from 'components';
import { Totals } from './Totals';
import { Clear, Search } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AllTransactionsScreen.styles';
import { formatDate } from 'utils/formatDate';
import { openModal } from 'utils/modal';
import { FilterTransactionsByAccModal } from 'components/modals/FilterTransactionsModal/FilterByAccount';

import { HeaderProps } from './AllTransactionsScreen.types';
import { FilterByTransactionType } from 'components/modals/FilterTransactionsModal/FilterByTransactionType';
import { FilterByDate } from 'components/modals/FilterTransactionsModal/FilterByDate';

export const ListHeader: FC<HeaderProps> = ({ setFilters, filters }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [value, onChangeText] = useState('');

  const onDatePress = () => {
    openModal({
      element: <FilterByDate setFilters={setFilters} />,
      disablePanning: true,
      title: 'transactions.date',
      snapPoints: ['100%'],
    });
  };

  const onAccountPress = () => {
    openModal({
      element: <FilterTransactionsByAccModal setFilters={setFilters} />,
      disablePanning: true,
      hideCloseButton: true,
      snapPoints: ['100%'],
    });
  };

  const onTransactionTypePress = () => {
    openModal({
      element: <FilterByTransactionType setFilters={setFilters} />,
      disablePanning: true,
      title: 'transactions.transactionType',
      snapPoints: ['100%'],
    });
  };

  const onClearDates = () => {
    setFilters(prev => ({
      ...prev,
      startDate: '',
      endDate: '',
    }));
  };
  const onClearAccount = () => {
    setFilters(prev => ({
      ...prev,
      iban: '',
      currency: null,
    }));
  };
  const onClearTransactionType = () => {
    setFilters(prev => ({
      ...prev,
      type: '',
    }));
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.inputContaner}>
        <Search />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={t('transactions.searchTransaction')}
        />
      </View>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={[
            styles.filterItem,
            filters.startDate && filters.endDate ? styles.selectedFilterWrapper : {},
          ]}
        >
          {filters.startDate && filters.endDate ? (
            <View style={styles.selectedFilterContainer}>
              <Text
                special
                numberOfLines={1}
                style={styles.text}
                children={formatDate(filters.startDate, ' YYYY')}
              />
              <Pressable onPress={onClearDates}>
                <Clear />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={onDatePress}>
              <Text children="transactions.date" special />
            </Pressable>
          )}
        </View>
        <View
          style={[
            styles.filterItem,
            filters.iban && filters.currency ? styles.selectedFilterWrapper : {},
          ]}
        >
          {filters.iban && filters.currency ? (
            <View style={styles.selectedFilterContainer}>
              <Text special numberOfLines={1} style={styles.text} children={filters.iban} />
              <Pressable onPress={onClearAccount}>
                <Clear />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={onAccountPress}>
              <Text children="transactions.account" special />
            </Pressable>
          )}
        </View>
        <View style={[styles.filterItem, filters.type ? styles.selectedFilterWrapper : {}]}>
          {filters.type ? (
            <View style={styles.selectedFilterContainer}>
              <Text
                special
                numberOfLines={1}
                style={styles.transactionTypeLabel}
                children={filters.type}
              />
              <Pressable onPress={onClearTransactionType}>
                <Clear />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={onTransactionTypePress}>
              <Text children="transactions.transactionType" special />
            </Pressable>
          )}
        </View>
      </ScrollView>
      <Totals income={2048} expense={1956} />
    </View>
  );
};
