import { useNavigation, useRoute } from '@react-navigation/native';
import { useCulture } from 'hooks/useCulture';
import { AUTOMATIC_PAYMENT_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { useCallback } from 'react';
import { useGetAutoPaymentsQuery } from 'services/apis';

export const useAutomaticPayments = () => {
  const { culture } = useCulture();
  const { params } = useRoute<ModalStackRouteProps<'AutomaticPaymentsScreen'>>();
  const { selectedAccountFromCard } = params || {};
  const { navigate } = useNavigation<ModalStackScreenProps<'AutomaticPaymentsScreen'>>();
  const { data: automaticPayments, isLoading } = useGetAutoPaymentsQuery({ culture });

  const handleItemPress = useCallback(
    (id: number, imageId: string) => {
      navigate(AUTOMATIC_PAYMENT_DETAILS_SCREEN, { id, imageId });
    },
    [navigate],
  );

  return {
    handleItemPress,
    isLoading,
    automaticPayments,
    selectedAccountFromCard,
  };
};
