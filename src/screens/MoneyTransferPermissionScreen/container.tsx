import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { useReceiveTransferMutation } from 'services/apis';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';
import { useCulture } from 'hooks/useCulture';
import { openToast } from 'utils/toast';
import { PAYMENT_SUCCESS_SCREEN } from 'navigation/ScreenNames';
import { useChooseBankAccount } from 'components/modals/ChooseBankAccountModal/container';

export enum CheckedValueEnum {
  accept = 'accept',
  notAccept = 'notAccept',
}

export const useCheckMoneyTransferProviderInfo = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferPermissionScreen'>>();
  const { providerItem, selectedAccount, transferCode, transferResponse, buyDetails } =
    params || {};

  const { culture } = useCulture();

  const [checkedValue, setCheckedValue] = useState<CheckedValueEnum>();

  const [receiveTransferMutation, { isLoading }] = useReceiveTransferMutation();
  const { groupedAccountsByIban } = useChooseBankAccount();

  /**
   * Filters only gel account
   */
  const getAccounts = useMemo(() => {
    return groupedAccountsByIban.map(group => ({
      ...group,
      accounts: group.accounts.filter(account => account.ccy === transferResponse.currency),
    }));
  }, [groupedAccountsByIban, transferResponse.currency]);

  const receiveTransferService = useCallback(
    async (sendOtp: boolean, OTPCode: string) => {
      try {
        if (isLoading) return;
        let sellAccountId = 0;
        if (buyDetails?.buyAmount) {
          if (buyDetails?.buyAmount) {
            const currentAccID = getAccounts.map(acc =>
              acc.accounts.find(account => account.ccy === transferResponse.currency),
            )?.[0]?.accountId;
            sellAccountId = currentAccID || 0;
          }
        }
        const body = {
          culture,
          mtSystem: providerItem.key,
          channelCode: 'DigitalChannel',
          transferNumber: transferCode,
          receiverCustomerId: 0,
          amount: transferResponse.amount,
          currency: transferResponse.currency,
          receiveBankAccountNumber: selectedAccount.accountIban,
          fieldValues: [],
          sellAccountId: sellAccountId,
          buyAccountId: buyDetails?.buyAmount ? selectedAccount.accountId : 0,
          buyAmount: buyDetails?.buyAmount || 0,
          buyCurrency: buyDetails?.buyCurrency || '',
          agreeCreditInfoAgreement: checkedValue === CheckedValueEnum.accept,
          isExchange: false,
          otp: OTPCode,
          sendOtp: sendOtp,
        };

        const response = await receiveTransferMutation(body);

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
          if (response.data.transferInfo) {
            navigate(PAYMENT_SUCCESS_SCREEN, transferResponse);
          } else {
            return response.data;
          }
        }
      } catch (e) {
        console.warn(e);
        return;
      }
    },
    [
      isLoading,
      buyDetails?.buyAmount,
      buyDetails?.buyCurrency,
      culture,
      providerItem.key,
      transferCode,
      transferResponse,
      selectedAccount.accountIban,
      selectedAccount.accountId,
      checkedValue,
      receiveTransferMutation,
      getAccounts,
      navigate,
    ],
  );

  const openOtpModal = useCallback(() => {
    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            closeModal();
            receiveTransferService(false, code);
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [receiveTransferService]);

  const receiveTransferOnPress = useCallback(async () => {
    const respInfo = await receiveTransferService(true, '');
    if (respInfo) {
      openOtpModal();
    }
  }, [openOtpModal, receiveTransferService]);

  return {
    checkedValue,
    setCheckedValue,
    receiveTransferOnPress,
    isLoading,
  };
};
