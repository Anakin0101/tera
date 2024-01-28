import { useNavigation } from '@react-navigation/native';
import { AUTOMATIC_PAYMENT_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { PaymentsStackScreenProps } from 'navigation/types';
import { useCallback } from 'react';

export const useAutomaticPayments = () => {
  const { navigate } = useNavigation<PaymentsStackScreenProps<'AutomaticPaymentDetailsScreen'>>();

  const handleItemPress = useCallback(() => {
    navigate(AUTOMATIC_PAYMENT_DETAILS_SCREEN);
  }, [navigate]);

  return {
    handleItemPress,
  };
};
