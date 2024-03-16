import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OTPModal } from 'components/modals';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { useCallback, useState } from 'react';
import { useAddCardInsuranceMutation } from 'services/apis';
import { closeModal, openModal } from 'utils/modal';
import { useCulture } from 'hooks/useCulture';
import { INSURANCE_SUCCESS_SCREEN } from 'navigation/ScreenNames';

export const useInsurancePackageDetails = () => {
  const { culture } = useCulture();
  const { navigate } = useNavigation<ModalStackScreenProps<'InsuranceSuccessScreen'>>();
  const { params } = useRoute<ModalStackRouteProps<'InsurancePackageDetailsScreen'>>();
  const { packageName, commission, insuranceTypeId, iban, activeCard } = params || {};
  const [agreed, setAgreed] = useState(false);
  const [addCardInsurance] = useAddCardInsuranceMutation();

  const onFinished = useCallback(
    (otp: string) => {
      // TODO change condition
      if (otp === '000000') {
        addCardInsurance({
          otp,
          sendOtp: false,
          culture,
          cardId: activeCard.id,
          insuranceTypeId,
          anyData: '',
        })
          .unwrap()
          .then(() => {
            closeModal();
            navigate(INSURANCE_SUCCESS_SCREEN);
          });
      }
    },
    [activeCard, addCardInsurance, culture, insuranceTypeId, navigate],
  );

  const handlePress = useCallback(() => {
    if (!agreed) return;

    addCardInsurance({
      sendOtp: true,
    });

    openModal({
      element: <OTPModal onFinished={onFinished} />,
      withKeyboard: true,
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [addCardInsurance, agreed, onFinished]);

  return {
    packageName,
    commission,
    agreed,
    setAgreed,
    handlePress,
    iban,
    activeCard,
  };
};
