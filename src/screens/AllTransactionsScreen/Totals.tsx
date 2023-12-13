import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { useStyles } from './AllTransactionsScreen.styles';
import { TotalsProps } from './AllTransactionsScreen.types';

export const Totals: FC<TotalsProps> = ({ income, expense }) => {
  const styles = useStyles();
  return (
    <View style={styles.totalsContainer}>
      <View style={[styles.total, { backgroundColor: Colors.success100 }]}>
        <Text label children="transactions.income" />
        <Text children={`+${formatMoney(income)}`} medium size={16} color={Colors.success} />
      </View>
      <View style={[styles.total, { backgroundColor: Colors.error100 }]}>
        <Text label children="transactions.expense" />
        <Text children={`-${formatMoney(expense)}`} medium size={16} color={Colors.error} />
      </View>
    </View>
  );
};
