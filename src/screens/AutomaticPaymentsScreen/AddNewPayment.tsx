import React from 'react';
import { Button } from 'components';
import { AddPlus } from 'assets/SVGs';
import { useStyles } from './AutomaticPaymentsScreen.styles';

export const AddNewPayment = () => {
  const styles = useStyles();

  return (
    <Button.Primary
      fullWidth
      text="automaticPayments.addPayment"
      leftIcon={AddPlus}
      onPress={() => {}}
      customWrapperStyle={styles.button}
    />
  );
};
