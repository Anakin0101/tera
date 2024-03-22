import React, { FC } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from 'components';
import { openModal } from 'utils/modal';
import { Clear, Search } from 'assets/SVGs';
import { formatDate } from 'utils/formatDate';
import { FilterByDate } from 'components/modals/FilterTransactionsModal/FilterByDate';
import { FilterTransactionsByAccModal } from 'components/modals/FilterTransactionsModal/FilterByAccount';
import { FilterByTransactionType } from 'components/modals/FilterTransactionsModal/FilterByTransactionType';
import { OpCategoryEnum } from 'services/apis/productsAPI/productsAPI.types';
import { HeaderProps } from './AllTransactionsScreen.types';
import { useStyles } from './AllTransactionsScreen.styles';
import { SPACED_YEAR } from 'constants/DateTemplates';

export const getTransactionTypeNameByEnum = (id: OpCategoryEnum) => {
  switch (id) {
    case OpCategoryEnum.Income:
      return 'filters.income';
    case OpCategoryEnum.ToSomeone:
      return 'filters.outcome';
    case OpCategoryEnum.ToOwnAccount:
      return 'filters.toOwnAccount';
    case OpCategoryEnum.Exchange:
      return 'filters.exchange';
    case OpCategoryEnum.ToTreasure:
      return 'filters.toTreasure';
    case OpCategoryEnum.Payments:
      return 'filters.payments';
  }
};

export const ListHeader: FC<HeaderProps> = ({
  setFilters,
  filters,
  search,
  onChangeText,
  iban,
  requestBlockedTransactions,
  blockedTransactionsFilterActive,
  clearBlockedTransactions,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

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
      accountNumber: null,
      currency: null,
    }));
  };

  const onClearTransactionType = () => {
    setFilters(prev => ({
      ...prev,
      category: null,
    }));
  };

  const onRequestBlockedTransactions = () => {
    requestBlockedTransactions?.();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.inputContaner}>
        <Search />
        <TextInput
          value={search}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={t('transactions.searchTransaction')}
          maxFontSizeMultiplier={1}
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
                children={formatDate(filters.startDate, SPACED_YEAR)}
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
            filters.accountNumber && filters.currency ? styles.selectedFilterWrapper : {},
          ]}
        >
          {filters.accountNumber && filters.currency ? (
            <View style={styles.selectedFilterContainer}>
              <Text
                special
                numberOfLines={1}
                style={styles.text}
                children={iban}
                ellipsizeMode="head"
              />
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
        <View style={[styles.filterItem, filters.category ? styles.selectedFilterWrapper : {}]}>
          {filters.category ? (
            <View style={styles.selectedFilterContainer}>
              <Text
                special
                numberOfLines={1}
                style={styles.transactionTypeLabel}
                children={getTransactionTypeNameByEnum(filters.category)}
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
        <View
          style={[
            styles.filterItem,
            blockedTransactionsFilterActive && styles.selectedFilterWrapper,
          ]}
        >
          {blockedTransactionsFilterActive ? (
            <View style={styles.selectedFilterContainer}>
              <Text
                special
                numberOfLines={1}
                style={styles.transactionTypeLabel}
                children={'transactions.blockedMoney'}
              />
              <Pressable onPress={clearBlockedTransactions}>
                <Clear />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={onRequestBlockedTransactions}>
              <Text children="transactions.blockedMoney" special />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
