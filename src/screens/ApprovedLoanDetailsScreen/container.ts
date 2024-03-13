import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { APPROVED_LOAN_PDF_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { useGetCreditDisbursementProductOfferDetailsQuery } from 'services/apis';
import { useCulture } from 'hooks/useCulture';
import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';

export const useApproveLoanDetails = () => {
  const { culture } = useCulture();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<ModalStackRouteProps<'ApprovedLoanDetailsScreen'>>();
  const { creditDisbursementId } = params || {};

  const { data: details, isLoading: isLoadingDetails } =
    useGetCreditDisbursementProductOfferDetailsQuery({
      creditDisbursementId,
      culture,
    });

  const handlePress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: APPROVED_LOAN_PDF_SCREEN,
      params: { creditDisbursementId },
    });
  }, [creditDisbursementId, navigate]);

  const isGeo = useMemo(() => {
    return culture === LanguageKeyForAPIEnum.KA;
  }, [culture]);

  return {
    handlePress,
    isLoadingDetails,
    details,
    isGeo,
  };
};
