import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './FilterTransactionsByAccModal.styles';
import { SelectCurrencyProps } from './FilterTransactionsByAccModal.types';

export const SelectCurrency: FC<SelectCurrencyProps> = ({
  iban,
  groupedAccountsByIban,
  setCurrency,
  currency,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.currencyModal}>
      <View style={styles.currencyContainer}>
        {groupedAccountsByIban
          .find(acc => acc.iban === iban)
          ?.accounts.map(account => (
            <Pressable
              key={account.ccy}
              onPress={() => setCurrency(account.ccy)}
              style={[styles.ccy, currency === account.ccy && styles.selectedCurrency]}
            >
              <Text children={account.ccy} medium special={currency === account.ccy} />
            </Pressable>
          ))}
      </View>
    </View>
  );
};
