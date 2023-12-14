import React, { useState } from 'react';
import {
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
import { FilterTransactionsByAccModal } from 'components/modals/FilterTransactionsByAccModal/FilterTransactionsByAccModal';

const filters = ['transactions.date', 'transactions.account', 'transactions.transactionType'];

const DATA = [
  {
    title: '2023-12-13T00:00:00',
    data: [
      {
        docDate: '2023-12-13T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
      {
        docDate: '2023-12-13T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
    ],
  },
  {
    title: '2023-12-12T00:00:00',
    data: [
      {
        docDate: '2023-12-12T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
      {
        docDate: '2023-12-12T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
      {
        docDate: '2023-12-12T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
      {
        docDate: '2023-12-12T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
    ],
  },
  {
    title: '2023-12-10T00:00:00',
    data: [
      {
        docDate: '2023-12-10T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
      {
        docDate: '2023-12-10T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
      {
        docDate: '2023-12-10T00:00:00',
        description: 'პირადი გადარიცხვა',
        balanceStart: 300,
        balance: 250,
        amount: 200,
        isIncome: true,
        senderIban: 'TR000000',
        currency: 'GEL',
      },
    ],
  },
];

const ListHeader = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [value, onChangeText] = useState('');

  const onAccountPress = () => {
    openModal({
      element: <FilterTransactionsByAccModal />,
      title: 'transactions.account',
      disablePanning: true,
      snapPoints: ['100%'],
    });
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
          <Pressable style={styles.filterItem} key={filter} onPress={onAccountPress}>
            <Text children={filter} special />
          </Pressable>
        ))}
      </ScrollView>
      <Totals income={2048} expense={1956} />
    </View>
  );
};

const ListFooter = () => {
  const styles = useStyles();

  const renderItem: SectionListRenderItem<any, any> = ({ item, index }) => {
    return (
      <View style={styles.itemWrapper}>
        <LastTransactionItem item={item} index={index} />
      </View>
    );
  };

  return (
    <View style={styles.sectionListWrapper}>
      <SectionList
        sections={DATA}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text children={formatDate(section.title, ' YYYY')} size={16} medium />
          </View>
        )}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export const AllTransactionsScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={['']}
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </View>
  );
};
