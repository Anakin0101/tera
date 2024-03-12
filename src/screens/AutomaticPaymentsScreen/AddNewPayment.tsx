import React, { FC, useCallback } from 'react';
import { Button } from 'components';
import { AddPlus } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { MODAL_STACK, NEW_PAYMENT_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useStyles } from './AutomaticPaymentsScreen.styles';
import { AddNewPaymentProps } from './AutomaticPaymentsScreen.types';

export const AddNewPayment: FC<AddNewPaymentProps> = ({ selectedAccountFromCard }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handlePress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: NEW_PAYMENT_SCREEN,
      params: {
        isAutomaticPayment: true,
        selectedAccountFromCard,
      },
    });
  }, [navigate, selectedAccountFromCard]);

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
