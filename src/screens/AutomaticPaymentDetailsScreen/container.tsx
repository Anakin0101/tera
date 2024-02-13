import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { OTPModal } from 'components/modals';
import { ModalStackRouteProps } from 'navigation/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCancelAutoPaymentMutation, useGetAutoPaymentDetailsMutation } from 'services/apis';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';
import { Colors } from 'theme/Variables';
import { closeModal, openModal } from 'utils/modal';

const savedLanguage = getValue(SELECTED_LANGUAGE);

export const useAutomaticPaymentDetails = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute<ModalStackRouteProps<'AutomaticPaymentDetailsScreen'>>();
  const { id, imageId } = params || {};
  const [getAutoPaymentDetails, { data: paymentDetails, isLoading }] =
    useGetAutoPaymentDetailsMutation();
  const [cancelAutoPayment] = useCancelAutoPaymentMutation();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  const getDetails = useCallback(() => {
    getAutoPaymentDetails({
      id,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    });
  }, [getAutoPaymentDetails, id]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  const toggleActionSheet = useCallback(() => {
    setIsActionSheetVisible(prev => !prev);
  }, []);

  const deleteAutoPayment = useCallback(() => {
    toggleActionSheet();

    cancelAutoPayment({
      sendOtp: true,
    });

    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
              cancelAutoPayment({
                sendOtp: false,
                autoPaymentId: paymentDetails?.id,
                getAuthMethod: false,
                otp: code,
              })
                .unwrap()
                .then(() => {
                  closeModal();
                  goBack();
                });
            }
          }}
        />
      ),
    });
  }, [cancelAutoPayment, goBack, paymentDetails?.id, toggleActionSheet]);

  const actionItems = useMemo(
    () => [
      {
        label: 'common.edit',
        onPress: () => {},
      },
      {
        label: 'common.delete',
        color: Colors.error,
        onPress: deleteAutoPayment,
      },
    ],
    [deleteAutoPayment],
  );

  return {
    isActionSheetVisible,
    toggleActionSheet,
    actionItems,
    isLoading,
    paymentDetails,
    imageId,
  };
};
