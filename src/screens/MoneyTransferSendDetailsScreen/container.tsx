import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { useSendTransferMutation } from 'services/apis';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';
import { openToast } from 'utils/toast';
import { MODAL_STACK, PAYMENT_SUCCESS_SCREEN } from 'navigation/ScreenNames';
import { useCulture } from 'hooks/useCulture';

export const useMoneyTransferSendDetails = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferSendPermissionScreen'>>();
  const {
    providerItem,
    selectedCountry,
    selectedCity,
    mtPoint,
    firstName,
    lastName,
    transferSendPrepareResponse,
    selectedAccount,
  } = params || {};

  const [sendTransfer, { isLoading }] = useSendTransferMutation();
  const { culture } = useCulture();

  const sendTransferService = useCallback(
    async (sendOtp: boolean, OTPCode: string) => {
      try {
        if (isLoading) return;
        const body = {
          culture,
          channelCode: 'DigitalChannel',
          otp: OTPCode,
          sendOtp: sendOtp,
          agreeCreditInfoAgreement: false,
          transferId: '',
          client: {
            bankAccountNumber: selectedAccount?.accountIban,
            clientId: 0,
            clientIdSpecified: true,
          },
          fieldValues: [
            { code: 'mts', value: providerItem.name },
            { code: 'receiveCountry', value: selectedCity?.country || '' },
            { code: 'receiveCity', value: selectedCity?.cityId || '' },
            { code: 'receivePoint.code', value: mtPoint?.code || '' },
            { code: 'amount', value: transferSendPrepareResponse?.principalAmount?.toString() },
            { code: 'payOutAmount', value: transferSendPrepareResponse?.payoutAmount?.toString() },
            { code: 'currency', value: transferSendPrepareResponse?.principalCurrency },
            { code: 'payOutCurrency', value: transferSendPrepareResponse?.payoutCurrency },
            { code: 'receiver.firstName', value: firstName },
            { code: 'receiver.lastName', value: lastName },
          ],
        };

        const response = await sendTransfer(body);

        if ('error' in response) {
          if ('data' in response.error) {
            // Use type assertion to inform TypeScript about the structure
            const errorData = response.error.data as {
              title?: string;
            };
            if (errorData.title) {
              openToast(errorData.title, 'error');
            }
            return;
          }
        } else if (response) {
          if (response.data.transfer) {
            navigate(MODAL_STACK, {
              screen: PAYMENT_SUCCESS_SCREEN,
              params: {
                transferSendPrepareResponse,
              },
            });
          } else {
            return response.data;
          }
        }
      } catch (ex) {
        console.warn('sendTransferService', ex);
      }
    },
    [
      culture,
      firstName,
      isLoading,
      lastName,
      mtPoint?.code,
      navigate,
      providerItem.name,
      selectedAccount?.accountIban,
      selectedCity?.cityId,
      selectedCity?.country,
      sendTransfer,
      transferSendPrepareResponse,
    ],
  );

  const openOtpModal = useCallback(() => {
    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            closeModal();
            sendTransferService(false, code);
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [sendTransferService]);

  const onSubmit = useCallback(async () => {
    const respInfo = await sendTransferService(true, '');
    if (respInfo) {
      openOtpModal();
    }
  }, [openOtpModal, sendTransferService]);

  return {
    onSubmit,
    providerItem,
    selectedCountry,
    selectedCity,
    mtPoint,
    firstName,
    lastName,
    transferSendPrepareResponse,
    selectedAccount,
    isLoading,
  };
};
