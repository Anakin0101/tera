import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';

export const Convert = () => {
  const styles = useStyleTheme();
  return (
    <View style={styles.transferWrapper}>
      <Text children="sdsd" />
    </View>
  );
};
