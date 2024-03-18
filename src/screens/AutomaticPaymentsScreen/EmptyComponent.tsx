import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { CalendarLarge } from 'assets/SVGs';
import { useStyles } from './AutomaticPaymentsScreen.styles';
import { EmptyComponentProps } from './AutomaticPaymentsScreen.types';

export const EmptyComponent: FC<EmptyComponentProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CalendarLarge />
        <Text children={'automaticPayments.empty'} size={16} center marginTop={24} />
        {children}
      </View>
    </View>
  );
};
