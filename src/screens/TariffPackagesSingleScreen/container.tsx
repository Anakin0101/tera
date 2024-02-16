import React from 'react';
import { useForm } from 'react-hook-form';
import { useActivatePackageMutation } from 'services/apis/productsAPI/productsAPI';
import { FormData } from './TariffPackagesSingle.types';
import { useCallback } from 'react';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SuccessModal } from './SuccessModal';
import { openToast } from 'utils/toast';

export const useTariffPackagesSingle = () => {
  const { control, watch } = useForm<FormData>();
  const checkboxValue = watch('save');
  const [activatePackage] = useActivatePackageMutation();
  const { selectedPackage } = useAppSelector(state => state.products);

  const handleRequestPackage = useCallback(() => {
    if (!checkboxValue) return;
    activatePackage({
      sendOtp: true,
    })
      .unwrap()
      .catch(error => {
        console.error('Error sending OTP:', error);
        openToast('Error sending OTP', 'error');
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
                culture: 'ka',
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
                  console.warn('Error activating package:', error);
                  openToast('Error activating package', 'error');
                  closeModal();
                });
            }
          }}
        />
      ),
      disablePanning: true,
    });
  }, [selectedPackage, checkboxValue, activatePackage]);

  return {
    control,
    handleRequestPackage,
    checkboxValue,
  };
};
