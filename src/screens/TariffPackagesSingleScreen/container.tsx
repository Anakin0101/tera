import React from 'react';
import { useForm } from 'react-hook-form';
import { useActivatePackageMutation } from 'services/apis/productsAPI/productsAPI';
import { TariffPackagesSingleFormData } from './TariffPackagesSingle.types';
import { useCallback } from 'react';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SuccessModal } from './SuccessModal';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';

const savedLanguage = getValue(SELECTED_LANGUAGE);

export const useTariffPackagesSingle = () => {
  const { control, watch } = useForm<TariffPackagesSingleFormData>();
  const checkboxValue = watch('agree');
  const [activatePackage, { isLoading: activatePackageLoading }] = useActivatePackageMutation();
  const { selectedPackage } = useAppSelector(state => state.products);
  const { t } = useTranslation();

  const handleRequestPackage = useCallback(() => {
    if (!checkboxValue) return;
    activatePackage({
      sendOtp: true,
    })
      .unwrap()
      .catch(error => {
        console.warn('Error sending OTP:', error);
        openToast(error?.data?.title?.length ? error?.data?.title : t('newDeposit.error'), 'error');
      });

    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code) {
              activatePackage({
                sendOtp: false,
                packageId: selectedPackage?.packageId,
                packageServiceId: selectedPackage?.packageServiceId,
                culture:
                  savedLanguage === LanguageKeys.geo
                    ? LanguageKeyForAPIEnum.KA
                    : LanguageKeyForAPIEnum.EN,
                timezoneOffset: -240,
                otp: code,
              })
                .unwrap()
                .then(() => {
                  openModal({
                    element: <SuccessModal />,
                  });
                })
                .catch(error => {
                  console.warn('Error activating package:', ErrorUtils);
                  openToast(
                    error?.data?.title?.length ? error?.data?.title : t('newDeposit.error'),
                    'error',
                  );
                  closeModal();
                });
            }
          }}
        />
      ),
      disablePanning: true,
    });
  }, [t, selectedPackage, checkboxValue, activatePackage]);

  return {
    control,
    handleRequestPackage,
    checkboxValue,
    activatePackageLoading,
  };
};
