import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './PaymentsScreen.style';
import useTheme from 'hooks/useTheme';

export const PaymentsScreen = () => {
  const { Fonts } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[Fonts.textSmall]}>Payments main Screen</Text>
    </View>
  );
};
