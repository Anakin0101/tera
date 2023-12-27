import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components';
import { closeModal, openModal } from 'utils/modal';
import { ProductsStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useNewDepositSummary = () => {
  const [isAgree, setIsAgree] = useState(false);
  const { navigate } = useNavigation<ProductsStackScreenProps<'DepositSuccessScreen'>>();
  const newDeposit = useAppSelector(state => state.deposit);

  const handlePress = () => {
    if (!isAgree) {
      return;
    }
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
    newDeposit,
  };
};
