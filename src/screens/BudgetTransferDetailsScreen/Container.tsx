import { useAppSelector } from 'store/hooks/useAppSelector';
import { useTransferDetails } from 'screens/TransferDetailScreen/container';
import { SelectedItemProp } from 'screens/TransferDetailScreen/TransferDetailScreen.types';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { useSendTreasuryMutation } from 'services/apis';
import { openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';
import { TransactionsStackScreenProps } from 'navigation/types';
import { TreasuryApiResponse } from 'services/apis/transfersAPI/transfersAPI.types';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TRANSACTION_FAILED_SCREEN, TRANSACTION_FINISHED_SCREEN } from 'navigation/ScreenNames';

export const useBudgetTransferDetail = () => {
  const { handleTransferInfo } = useTransferDetails(false);
  const { t } = useTranslation();
  const PERSONAL_TRANSACTION = t('transactions.defaultTitle');
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );
  const { accountFromData, accountToData, selectedPrice, setBudgetPerson, selectedData } =
    selectedItemFromStore;
  const [sendTreasuryMutation, { isLoading: isTreasuryLoading }] = useSendTreasuryMutation();

  const handleTreasuryTransfer = async (includeGetauthmethod = true, code?: string) => {
    let headers: { [key: string]: string } = {
      'X-Bank-Isstrongauthrequest': 'true',
      'X-Bank-Getauthmethod': includeGetauthmethod ? 'true' : 'false',
      ...(code !== undefined && { 'X-Bank-Otp': code }),
    };

    return sendTreasuryMutation({
      headers,
      body: {
        amount: selectedPrice,
        debitAccountId: accountFromData.accountId,
        payForSomeone: setBudgetPerson.payForSomeone,
        payerCode: setBudgetPerson.payerCode,
        payerName: setBudgetPerson.payerName,
        purpose: selectedData ? selectedData : PERSONAL_TRANSACTION,
        sendOtp: false,
        treasuryCode: accountToData.iban,
        usedTemplateId: null,
      },
    });
  };

  const navigateToTransferScreen = async () => {
    const checkTransfer = await handleTransferInfo({
      transferType: FinancialTransferTypeEnum.ToTreasury,
      debitAccountId: accountFromData.accountId,
      amount: selectedPrice,
      fastPayment: false,
      ensured: false,
      receiverBankCode: null,
    });

    if (checkTransfer?.isSuccess) {
      const response: TreasuryApiResponse = await handleTreasuryTransfer(true);
      if (response?.data?.otpRequired) {
        openModal({
          element: <OTPModal onFinished={code => handleTreasuryTransfer(false, code)} />,
        });
      }
      const CheckedResponse = await handleTreasuryTransfer(false);
      if (CheckedResponse) {
        navigate(TRANSACTION_FINISHED_SCREEN);
      } else {
        navigate(TRANSACTION_FAILED_SCREEN);
      }
    } else {
      console.warn('error during treasury transfer');
    }
  };
  return {
    navigateToTransferScreen,
    isTreasuryLoading,
  };
};
