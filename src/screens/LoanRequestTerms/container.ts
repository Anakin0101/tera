import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LOAN_REQUEST_ADDITIONAL_INFO_SCREEN } from 'navigation/ScreenNames';
import { useGetRequestForLoanConsentTextQuery } from 'services/apis';
import { ProductsStackScreenProps } from 'navigation/types';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';

export const useLoanRequestTerms = () => {
  const lng = getValue(SELECTED_LANGUAGE) || LanguageKeys.geo;
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanRequestAdditionalInfo'>>();
  const [consentToDataProcessing, setConsentToDataProcessing] = useState(false);
  const [consentToProcessCreditInfo, setConsentToProcessCreditInfo] = useState(false);
  const [consentToProcessRemittances, setConsentToProcessRemittances] = useState(false);
  const { data: consentTexts, isLoading: isConsentTextsLoading } =
    useGetRequestForLoanConsentTextQuery(lng === 'geo' ? 'ka' : 'en');

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
    consentTexts,
    isConsentTextsLoading,
  };
};
