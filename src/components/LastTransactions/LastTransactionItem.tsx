import React, { FC } from 'react';
import { View } from 'react-native';
import { Divider, Text } from '../index';
import { useTheme } from 'hooks';
import { LastTransactionProps } from './LastTransaction.types';
import { useStyles } from './LastTransactions.styles';

const LastTransactionItem: FC<LastTransactionProps> = ({ item, index }) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  return (
    <View style={styles.transactionWrapper}>
      <View style={styles.imageContainer} />
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <Text size={14}>{item.title}</Text>
          <Text size={14}>-${item.amount}</Text>
        </View>
        <View style={styles.details}>
          <Text children={item.value} size={12} color={Colors.textBlack400} />
          <Text children={item.date} size={12} color={Colors.textBlack400} />
        </View>
        {index < 3 && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
      </View>
    </View>
  );
};

export default LastTransactionItem;
