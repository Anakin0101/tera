import React, { FC } from 'react';
import { View } from 'react-native';
import { Divider, Text } from '../index';
import { useTheme } from 'hooks';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { LastTransactionProps } from './LastTransaction.types';
import { useStyles } from './LastTransactions.styles';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';

const LastTransactionItem: FC<LastTransactionProps> = ({ item }) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  return (
    <View style={styles.transactionWrapper}>
      <View style={styles.imageContainer} />
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <Text size={14} numberOfLines={1} style={{ flex: 1 }}>
            {item.description}
          </Text>
          <Text size={14} medium color={item.isIncome ? Colors.success : Colors.black700}>
            {!item.isIncome && '-'} {CurrencySignMap[item.currency]}
            {formatMoney(item.amount)}
          </Text>
        </View>
        <View style={styles.details}>
          <Text children="" size={12} color={Colors.textBlack400} />
          <Text children={formatDate(item.docDate)} size={12} color={Colors.textBlack400} />
        </View>
        <Divider height={1} marginTop={18} marginBottom={18} width="100%" />
      </View>
    </View>
  );
};

export default LastTransactionItem;
