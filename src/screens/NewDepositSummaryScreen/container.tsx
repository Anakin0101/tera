import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components';
import { closeModal, openModal } from 'utils/modal';
import { ModalStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import {
  useActivateDepositMutation,
  useRegisterDepositMutation,
} from 'services/apis/productsAPI/productsAPI';
import { RegisterDepositReq } from 'services/apis/productsAPI/productsAPI.types';
import { DEPOSIT_SUCCESS_SCREEN } from 'navigation/ScreenNames';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';

export const useNewDepositSummary = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const [isAgree, setIsAgree] = useState(false);
  const { navigate } = useNavigation<ModalStackScreenProps<'DepositSuccessScreen'>>();
  const newDeposit = useAppSelector(state => state.deposit);
  const [registerDeposit, { data: result, isLoading: isLoadingRegistration }] =
    useRegisterDepositMutation();
  const { productId, duration, initialAmount, creditAccount, debitAccount, imageUrl, offer } =
    useAppSelector(state => state.deposit);
  const [activateDeposit] = useActivateDepositMutation();

  const isSingleOption = useMemo(() => {
    return offer?.depositProducts.length === 1;
  }, [offer]);

  useEffect(() => {
    if (result) {
      activateDeposit({
        sendOtp: true,
      });

      openModal({
        element: (
          <OTPModal
            onFinished={code => {
              if (code === '000000') {
                activateDeposit({
                  sendOtp: false,
                  otp: code,
                  depositId: result.depositId,
                  fileId: result.agreementId,
                  cdFileId: result.cdRegistryId,
                  bpId: result.bpId,
                  productType: 'deposit', // temp
                })
                  .unwrap()
                  .then(() => {
                    closeModal();
                    navigate(DEPOSIT_SUCCESS_SCREEN);
                  });
              }
            }}
          />
        ),
        disableDynamicSizing: true,
        disablePanning: true,
      });
    }
  }, [activateDeposit, navigate, result]);

  const handlePress = () => {
    if (!isAgree) {
      return;
    }

    const depositParams: RegisterDepositReq = {
      productId,
      amount: initialAmount,
      creditAccountId: creditAccount.id,
      debitAccountId: debitAccount.id,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    };

    if (!isSingleOption) {
      depositParams.periodInMonths = Number(duration);
    }

    registerDeposit(depositParams);
  };

  return {
    handlePress,
    isAgree,
    setIsAgree,
    newDeposit,
    isLoadingRegistration,
    imageUrl,
    isSingleOption,
  };
};
