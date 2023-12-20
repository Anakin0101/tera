import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './FilterTransactionsModal.styles';
import { SelectCurrencyProps } from './FilterTransactionsModal.types';

export const SelectCurrency: FC<SelectCurrencyProps> = ({
  accountNumber,
  groupedAccountsByIban,
  setCurrency,
  currency,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.currencyModal}>
      <View style={styles.currencyContainer}>
        {groupedAccountsByIban
          .find(acc => acc.accountNumber === accountNumber)
          ?.accounts.map(account => (
            <Pressable
              key={account.ccy}
              onPress={() => setCurrency(account.ccy)}
              style={[styles.ccy, currency === account.ccy && styles.selectedItem]}
            >
              <Text children={account.ccy} medium special={currency === account.ccy} />
            </Pressable>
          ))}
      </View>
    </View>
  );
};
