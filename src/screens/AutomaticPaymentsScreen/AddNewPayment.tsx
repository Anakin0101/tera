import React, { useCallback } from 'react';
import { Button } from 'components';
import { AddPlus } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { MODAL_STACK, NEW_PAYMENT_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useStyles } from './AutomaticPaymentsScreen.styles';

export const AddNewPayment = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handlePress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: NEW_PAYMENT_SCREEN,
      params: { isAutomaticPayment: true },
    });
  }, [navigate]);

  return (
    <Button.Primary
      fullWidth
      text="automaticPayments.addPayment"
      leftIcon={AddPlus}
      onPress={handlePress}
      customWrapperStyle={styles.button}
    />
  );
};
