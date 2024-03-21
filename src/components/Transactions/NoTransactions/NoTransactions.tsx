import React from 'react';
import { useStyles } from './NoTransactions.styles';
import { View } from 'react-native';
import { Text } from 'components/index';
import { NoTransactionsIcon } from 'assets/SVGs';
import { NoTransactionsType } from './NoTransactions.types';

export const NoTransactions = ({ containerStyle, text, textStyle }: NoTransactionsType) => {
  const styles = useStyles();
  return (
    <View style={[styles.noTransactionsWrapper, containerStyle]}>
      <NoTransactionsIcon />
      <Text
        center
        medium
        children={text ?? 'dashboard.noTransactions'}
        style={[styles.noTransactionsText, textStyle]}
      />
    </View>
  );
};
