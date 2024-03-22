import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { ListHeader } from './ListHeader';
import { useAllTransactions } from './container';
import { useStyles } from './AllTransactionsScreen.styles';
import { Sections } from './Sections';

export const AllTransactionsScreen = () => {
  const styles = useStyles();
  const {
    setFilters,
    sections,
    filters,
    search,
    onChangeText,
    iban,
    requestBlockedTransactions,
    loading,
    blockedTransactionsFilterActive,
    clearBlockedTransactions,
  } = useAllTransactions();

  const renderItem = useCallback(() => {
    return (
      <Sections
        sections={sections}
        loading={loading}
        blockedTransactionsFilterActive={blockedTransactionsFilterActive}
      />
    );
  }, [sections, loading, blockedTransactionsFilterActive]);

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={['']}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeader
            iban={iban}
            search={search}
            filters={filters}
            setFilters={setFilters}
            onChangeText={onChangeText}
            requestBlockedTransactions={requestBlockedTransactions}
            blockedTransactionsFilterActive={blockedTransactionsFilterActive}
            clearBlockedTransactions={clearBlockedTransactions}
          />
        }
      />
    </View>
  );
};
