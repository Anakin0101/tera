import { useNavigation } from '@react-navigation/native';
import { LOAN_REQUEST_ADDITIONAL_INFO_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';
import { useCallback, useMemo, useState } from 'react';

export const useLoanRequestTerms = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanRequestAdditionalInfo'>>();
  const [consentToDataProcessing, setConsentToDataProcessing] = useState(false);
  const [consentToProcessCreditInfo, setConsentToProcessCreditInfo] = useState(false);
  const [consentToProcessRemittances, setConsentToProcessRemittances] = useState(false);

  const allChecked = useMemo(() => {
    return consentToDataProcessing && consentToProcessCreditInfo && consentToProcessRemittances;
  }, [consentToDataProcessing, consentToProcessCreditInfo, consentToProcessRemittances]);

  const handlePress = useCallback(() => {
    if (!allChecked) {
      return;
    }
    navigate(LOAN_REQUEST_ADDITIONAL_INFO_SCREEN);
  }, [allChecked, navigate]);

  return {
    consentToDataProcessing,
    consentToProcessCreditInfo,
    consentToProcessRemittances,
    setConsentToDataProcessing,
    setConsentToProcessCreditInfo,
    setConsentToProcessRemittances,
    handlePress,
    allChecked,
  };
};
