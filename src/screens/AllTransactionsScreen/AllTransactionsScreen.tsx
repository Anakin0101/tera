import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { Text } from 'components';
import { Totals } from './Totals';
import { Search } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AllTransactionsScreen.styles';

const filters = ['transactions.date', 'transactions.account', 'transactions.transactionType'];

export const AllTransactionsScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [value, onChangeText] = useState('');

  return (
    <>
      <View style={styles.container}>
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
            <View style={styles.filterItem} key={filter}>
              <Text children={filter} special />
            </View>
          ))}
        </ScrollView>
        <Totals income={2048} expense={1956} />
      </View>
      <View style={styles.sectionListWrapper} />
    </>
  );
};
