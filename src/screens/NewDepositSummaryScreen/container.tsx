import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components';
import { closeModal, openModal } from 'utils/modal';
import { ProductsStackScreenProps } from 'navigation/types';

export const useNewDepositSummary = () => {
  const [isAgree, setIsAgree] = useState(false);
  const { navigate } = useNavigation<ProductsStackScreenProps<'DepositSuccessScreen'>>();

  const handlePress = () => {
    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
              closeModal();
              navigate('DepositSuccessScreen');
            }
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  };

  return {
    handlePress,
    isAgree,
    setIsAgree,
  };
};
