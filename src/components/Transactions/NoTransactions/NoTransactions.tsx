import React from 'react';
import { useStyles } from './NoTransactions.styles';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from 'components/index';
import { NoTransactionsIcon } from 'assets/SVGs';

export const NoTransactions = ({
  containerStyle,
  text,
  textStyle,
}: {
  containerStyle?: StyleProp<ViewStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}) => {
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
