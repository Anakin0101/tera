import { useMemo, useState } from 'react';

export const useLoanRequestTerms = () => {
  const [consentToDataProcessing, setConsentToDataProcessing] = useState(false);
  const [consentToProcessCreditInfo, setConsentToProcessCreditInfo] = useState(false);
  const [consentToProcessRemittances, setConsentToProcessRemittances] = useState(false);

  const allChecked = useMemo(() => {
    return consentToDataProcessing && consentToProcessCreditInfo && consentToProcessRemittances;
  }, [consentToDataProcessing, consentToProcessCreditInfo, consentToProcessRemittances]);

  const handlePress = () => {
    if (!allChecked) {
      return;
    }
  };

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
