import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { CalendarLarge } from 'assets/SVGs';
import { AddNewPayment } from './AddNewPayment';
import { useStyles } from './AutomaticPaymentsScreen.styles';

export const EmptyComponent = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CalendarLarge />
        <Text children={'automaticPayments.empty'} size={16} center marginTop={24} />
        <AddNewPayment />
      </View>
    </View>
  );
};
