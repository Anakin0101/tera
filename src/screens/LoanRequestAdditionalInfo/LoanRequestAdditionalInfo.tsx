import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './LoanRequestAdditionalInfo.styles.';

export const LoanRequestAdditionalInfo = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>RequestLoanAdditionalInfo</Text>
    </View>
  );
};
