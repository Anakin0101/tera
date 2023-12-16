import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  SectionList,
  SectionListRenderItem,
  TextInput,
  View,
} from 'react-native';
import { Text } from 'components';
import { Totals } from './Totals';
import { Search } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AllTransactionsScreen.styles';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import { formatDate } from 'utils/formatDate';
import { openModal } from 'utils/modal';
import { FilterTransactionsByAccModal } from 'components/modals/FilterTransactionsModal/FilterByAccount';
import { useAllTransactions } from './container';
import {
  FooterProps,
  HeaderProps,
  KeyExtractor,
  RenderSectionHeader,
  ISections,
} from './AllTransactionsScreen.types';
import { FilterByTransactionType } from 'components/modals/FilterTransactionsModal/FilterByTransactionType';
import { FilterByDate } from 'components/modals/FilterTransactionsModal/FilterByDate';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';

const filters = ['transactions.date', 'transactions.account', 'transactions.transactionType'];

const ListHeader: FC<HeaderProps> = ({ setFilters }) => {
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

  const handlePress = (filter: string) => {
    if (filter === 'transactions.date') {
      onDatePress();
    }
    if (filter === 'transactions.account') {
      onAccountPress();
    }
    if (filter === 'transactions.transactionType') {
      onTransactionTypePress();
    }
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
        {filters.map(filter => (
          <Pressable style={styles.filterItem} key={filter} onPress={() => handlePress(filter)}>
            <Text children={filter} special />
          </Pressable>
        ))}
      </ScrollView>
      <Totals income={2048} expense={1956} />
    </View>
  );
};

const Sections: FC<FooterProps> = ({ sections }) => {
  const styles = useStyles();

  const renderItem: SectionListRenderItem<TransactionType, ISections> = ({ item }) => {
    return (
      <View style={styles.itemWrapper}>
        <LastTransactionItem item={item} />
      </View>
    );
  };

  const renderSectionHeader: RenderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text children={formatDate(section.title, ' YYYY')} size={16} medium />
      </View>
    );
  };

  const keyExtractor: KeyExtractor = (item, index) => String(item.id + index);

  return (
    <View style={styles.sectionListWrapper}>
      {sections ? (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export const AllTransactionsScreen = () => {
  const styles = useStyles();
  const { setFilters, sections } = useAllTransactions();

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={['']}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={() => <Sections sections={sections} />}
        ListHeaderComponent={<ListHeader setFilters={setFilters} />}
      />
    </View>
  );
};
