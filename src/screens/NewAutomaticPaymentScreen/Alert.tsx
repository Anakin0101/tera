import React, { FC } from 'react';
import { Text } from 'components';
import { View } from 'react-native';
import { AlertCircle } from 'assets/SVGs';
import { useStyles } from './NewAutomaticPaymentScreen.styles';
import { AlertProps } from './NewAutomaticPaymentScreen.types';

export const Alert: FC<AlertProps> = ({ message }) => {
  const styles = useStyles();
  return (
    <View style={styles.alertContainer}>
      <AlertCircle />
      <Text children={message} style={styles.fill} size={12} />
    </View>
  );
};
