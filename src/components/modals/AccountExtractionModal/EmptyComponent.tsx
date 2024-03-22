import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { NoTransactions } from 'assets/SVGs';
import { useStyles } from './AccountExtractionModal.styles';

export const EmptyComponent = () => {
  const styles = useStyles();
  return (
    <View style={styles.noTransactionsWrapper}>
      <NoTransactions />
      <Text
        center
        medium
        children="products.emptyOps"
        color={Colors.textBlack500}
        style={styles.noTransactionsText}
      />
    </View>
  );
};
