import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './LoanRequestScreen.styles';

export const LoanRequestScreen = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>LoanRequestScreen</Text>
    </View>
  );
};
