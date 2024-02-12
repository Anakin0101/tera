import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { SelectedItemProp, paramsTypes } from './TransferDetailScreen.types';
import { TransferDetailsList } from './TransferDetailsList';
import { useRoute } from '@react-navigation/native';
import { TransactionsStackRouteProps, TransactionsStackScreenProps } from 'navigation/types';
import { useTransferDetails } from './container';
import { TRANSACTION_FINISHED_SCREEN, TRANSACTION_FAILED_SCREEN } from 'navigation/ScreenNames';
import { ConversionOrTranferDetails } from './ConversionOrTranferDetails';
import { OtherBankList } from './OtherBankList';
import { openModal, closeModal } from 'utils/modal';
import { OTPModal } from 'components';
import {
  TransferToOwnAccountResponseType,
  TransferToSomeoneResultResponseType,
} from 'services/apis/transfersAPI/transfersAPI.types';
import { useTranslation } from 'react-i18next';
import { PERSONAL_TRANSACTION } from 'utils/transactionUtils';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setTransferType, setSpecificTransferData } from 'store/slices/transfers';
import { TransferTemplateTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { CustomBackendError } from 'services/types';

export const TransferDetailScreen = () => {
  const { t } = useTranslation();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );

  const { params } = useRoute<TransactionsStackRouteProps<'TransferDetailScreen'>>();
  const { handleExchangeAmount, handleTransferToOwnAccount, transferToSomeone, isLoading } =
    useTransferDetails(!!params?.mobileTransaction);

  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const dispatch = useAppDispatch();
  const {
    accountFromData,
    accountToData,
    convertionData,
    selectedPrice,
    receiverInfo,
    otpData,
    selectedData,
    accountIban,
    selectedTransactionType,
    selectedOtherBankDataTitle,
    isInternal,
  } = selectedItemFromStore;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const transferWithOTP = async (params: paramsTypes, code?: string) => {
    let headers: { [key: string]: string } = {
      'X-Bank-Isstrongauthrequest': 'true',
      'Content-Type': 'multipart/form-data',
      ...(code !== undefined && { 'X-Bank-Otp': code }),
    };

    if (!params?.mobileTransaction) {
      const formData = new FormData();
      formData.append('debitAccountId', accountFromData.accountId);
      formData.append(
        'receiverIban',
        accountIban?.accountIbanId?.accountIban || accountToData?.iban,
      );
      formData.append('amount', selectedPrice);
      formData.append('receiverName', receiverInfo.customerName);
      formData.append(
        'purpose',
        params.fromOtherBank && !selectedData
          ? selectedOtherBankDataTitle
          : selectedData || t('transfers.bankingTransferOfBalance'),
      );

      formData.append('extraPurpose', '');
      formData.append('otp', '');
      formData.append('fastPayment', 'false');
      formData.append('bankCode', receiverInfo.bicCode);
      formData.append('bankName', receiverInfo.bankName);

      const transferToSomeoneResult: TransferToSomeoneResultResponseType = await transferToSomeone({
        headers: headers,
        body: formData,
      });
      dispatch(
        setTransferType({
          type: isInternal
            ? TransferTemplateTypeEnum.ToSomeoneInsideBank
            : TransferTemplateTypeEnum.ToSomeoneInGeorgia,
        }),
      );

      dispatch(
        setSpecificTransferData({
          transferType: isInternal ? 'bankInternal' : 'bankExternal',
          data: {
            personalId: null,
            debitIban: accountFromData.accountIban,
            creditIban: accountToData.accountIban || accountToData.iban,
            currency: accountFromData.ccy,
            amount: selectedItemFromStore.selectedPrice,
            description: selectedData ? selectedData : PERSONAL_TRANSACTION,
            extraDescription: '',
            isTrusted: false,
          },
        }),
      );
      closeModal();

      if (transferToSomeoneResult?.error) {
        handleTransferError(transferToSomeoneResult.error);
        return;
      }

      if (transferToSomeoneResult) {
        navigate(TRANSACTION_FINISHED_SCREEN, { fromIban: true });
      }
    } else {
      headers['Content-Type'] = 'application/json';
      const requestBody = {
        debitAccountId: accountFromData.accountId,
        mobile: accountToData.iban,
        amount: selectedPrice,
        receiverName: receiverInfo?.customerName,
        purpose: selectedData ? selectedData : PERSONAL_TRANSACTION,
        extraPurpose: '',
        otp: '',
        fastPayment: selectedTransactionType.isSelected,
        bankCode: receiverInfo.bicCode,
        bankName: receiverInfo.bankName,
      };

      if (code !== undefined) {
        requestBody.otp = code;
      }

      const transferToSomeoneResult: TransferToSomeoneResultResponseType = await transferToSomeone({
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      closeModal();
      if (transferToSomeoneResult?.error) {
        handleTransferError(transferToSomeoneResult.error);
        return;
      }

      if (transferToSomeoneResult) {
        navigate(TRANSACTION_FINISHED_SCREEN);
      }
    }
  };
  const handleTransferError = (error: any) => {
    if ('data' in error) {
      const { data } = error as CustomBackendError;
      if (data?.status === 400) {
        navigate(TRANSACTION_FAILED_SCREEN);
      } else {
        console.warn('Transfer Error:', error);
      }
    }
  };
  const handleButtonPress = async () => {
    if (params?.convertion && !params?.fromOtherBank) {
      try {
        const transferConvertion: TransferToOwnAccountResponseType = await handleExchangeAmount({
          debitAmount: convertionData?.buyAmount.amountBuy,
          creditAmount: convertionData?.buyAmount.amountSell,
          creditAccountId: accountToData?.accountId,
          debitAccountId: accountFromData?.accountId,
        });

        dispatch(
          setTransferType({
            type: TransferTemplateTypeEnum.Exchange,
          }),
        );

        dispatch(
          setSpecificTransferData({
            transferType: 'conversion',
            data: {
              debitIban: accountFromData.accountIban,
              debitCurrency: accountFromData.ccy,
              creditIban: accountToData.accountIban || accountToData.iban,
              creditCurrency: accountToData.ccy,
            },
          }),
        );
        if (transferConvertion?.error) {
          handleTransferError(transferConvertion.error);
        } else {
          navigate(TRANSACTION_FINISHED_SCREEN, { convertion: true });
        }
      } catch (error) {
        console.warn('Exchange Amount Error:', error);
      }
    } else if (params.fromOtherBank) {
      if (otpData.otpRequired) {
        openModal({
          element: <OTPModal onFinished={code => transferWithOTP(params, code)} />,
          withKeyboard: true,
        });
      } else {
        await transferWithOTP(params);
      }
    } else {
      try {
        const transferResult: TransferToOwnAccountResponseType = await handleTransferToOwnAccount({
          amount: selectedItemFromStore.selectedPrice,
          creditAccountId: accountToData?.accountId,
          debitAccountId: accountFromData?.accountId,
        });
        dispatch(
          setTransferType({
            type: TransferTemplateTypeEnum.ToOwnAccount,
          }),
        );

        dispatch(
          setSpecificTransferData({
            transferType: 'internal',
            data: {
              debitIban: accountFromData.accountIban,
              currency: accountFromData.ccy,
              creditIban: accountToData.accountIban || accountToData.iban,
              amount: selectedItemFromStore.selectedPrice,
            },
          }),
        );

        if (transferResult?.error) {
          handleTransferError(transferResult.error);
        } else {
          navigate(TRANSACTION_FINISHED_SCREEN, { internal: true });
        }
      } catch (error) {
        console.warn('Transfer to Own Account Error:', error);
      }
    }
  };
  const styles = useStyleTheme();

  const { buyAmount } = selectedItemFromStore?.convertionData || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerWrapper}>
        <ConversionOrTranferDetails
          buyAmount={buyAmount}
          accountFromData={accountFromData}
          params={params}
          selectedPrice={selectedPrice}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.wrapper}>
          {params?.fromOtherBank ? (
            <OtherBankList
              selectedItemFromStore={selectedItemFromStore}
              receiver={params?.receiver}
            />
          ) : (
            <TransferDetailsList
              selectedItemFromStore={selectedItemFromStore}
              convertion={params?.convertion}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button.Primary
          text={t('transfers.transfer')}
          hitSlop={30}
          fixedWidth
          onPress={() => {
            handleButtonPress();
          }}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};
