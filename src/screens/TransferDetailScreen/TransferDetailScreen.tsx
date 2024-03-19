import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { SelectedItemProp, paramsTypes } from './TransferDetailScreen.types';
import { TransferDetailsList } from './TransferDetailsList';
import { useRoute } from '@react-navigation/native';
import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { useTransferDetails } from './container';
import {
  TRANSACTION_FINISHED_SCREEN,
  TRANSACTION_FAILED_SCREEN,
  MODAL_STACK,
} from 'navigation/ScreenNames';
import { ConversionOrTranferDetails } from './ConversionOrTranferDetails';
import { OtherBankList } from './OtherBankList';
import { openModal, closeModal } from 'utils/modal';
import { OTPModal } from 'components';
import {
  TRANSFER_TYPE,
  TransferToOwnAccountResponseType,
  TransferToSomeoneResultResponseType,
} from 'services/apis/transfersAPI/transfersAPI.types';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setTransferType, setSpecificTransferData } from 'store/slices/transfers';
import { TransferTemplateTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { CustomBackendError } from 'services/types';

export const TransferDetailScreen = () => {
  const { t } = useTranslation();

  const PERSONAL_TRANSACTION = t('transactions.defaultTitle');
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );

  const { params } = useRoute<ModalStackRouteProps<'TransferDetailScreen'>>();
  const { handleExchangeAmount, handleTransferToOwnAccount, transferToSomeone, isLoading } =
    useTransferDetails(!!params?.mobileTransaction);

  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
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
        accountIban ? accountIban?.accountIbanId : accountToData?.iban,
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
          transferType: isInternal ? TRANSFER_TYPE.bankInternal : TRANSFER_TYPE.bankExternal,
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
        navigate(MODAL_STACK, {
          screen: TRANSACTION_FINISHED_SCREEN,
          params: { fromIban: true },
        });
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
        navigate(MODAL_STACK, {
          screen: TRANSACTION_FINISHED_SCREEN,
          params: { mobileTransaction: true },
        });
      }
    }
  };
  const handleTransferError = (error: any) => {
    if ('data' in error) {
      const { data } = error as CustomBackendError;
      if (data?.status === 400) {
        navigate(MODAL_STACK, {
          screen: TRANSACTION_FAILED_SCREEN,
        });
      } else {
        console.warn('Transfer Error:', error);
      }
    }
  };
  const handleButtonPress = async () => {
    if (params?.convertion && !params?.fromOtherBank) {
      try {
        const transferConvertion: TransferToOwnAccountResponseType | undefined =
          await handleExchangeAmount({
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
          navigate(MODAL_STACK, {
            screen: TRANSACTION_FINISHED_SCREEN,
            params: { convertion: true },
          });
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
        const transferResult: TransferToOwnAccountResponseType | undefined =
          await handleTransferToOwnAccount({
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
            transferType: TRANSFER_TYPE.internal,
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
          navigate(MODAL_STACK, {
            screen: TRANSACTION_FINISHED_SCREEN,
            params: { internal: true },
          });
        }
      } catch (error) {
        console.warn('Transfer to Own Account Error:', error);
      }
    }
  };
  const styles = useStyleTheme();

  const { buyAmount } = selectedItemFromStore?.convertionData || {};

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.containerWrapper}>
          <ConversionOrTranferDetails
            buyAmount={buyAmount}
            accountFromData={accountFromData}
            params={params}
            selectedPrice={selectedPrice}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              {params?.fromOtherBank ? (
                <OtherBankList
                  selectedItemFromStore={selectedItemFromStore}
                  receiver={params?.receiver}
                  mobileTransaction={params?.mobileTransaction}
                  fastPaymentFee={params?.fastPaymentFee}
                  fee={params?.fee}
                />
              ) : (
                <TransferDetailsList
                  selectedItemFromStore={selectedItemFromStore}
                  convertion={params?.convertion}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            text={t('transfers.transfer')}
            hitSlop={15}
            fixedWidth
            onPress={() => {
              handleButtonPress();
            }}
            isLoading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};
