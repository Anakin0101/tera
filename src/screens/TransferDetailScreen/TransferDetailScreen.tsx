import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { CustomTransferResultError, SelectedItemProp } from './TransferDetailScreen.types';
import { TransferDetailsList } from './TransferDetailsList';
import { useRoute } from '@react-navigation/native';
import { TransactionsStackRouteProps, TransactionsStackScreenProps } from 'navigation/types';
import { useTransferDetails } from './container';
import { TRANSACTION_FINISHED_SCREEN, TRANSACTION_FAILED_SCREEN } from 'navigation/ScreenNames';
import { ConversionOrTranferDetails } from './ConversionOrTranferDetails';
import { OtherBankList } from './OtherBankList';
import { openModal, closeModal } from 'utils/modal';
import { OTPModal } from 'components';
import { TransferToOwnAccountResponseType } from 'services/apis/transfersAPI/transfersAPI.types';
import { useTranslation } from 'react-i18next';

export const TransferDetailScreen = () => {
  const { t } = useTranslation();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );

  const { params } = useRoute<TransactionsStackRouteProps<'TransferDetailScreen'>>();
  const {
    handleExchangeAmount,
    handleTransferToOwnAccount,
    transferToSomeone,
    PERSONAL_TRANSACTION,
    isLoading,
  } = useTransferDetails(params?.mobileTransaction ? true : false);

  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
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
  } = selectedItemFromStore;

  const transferWithOTP = async (code: any, params: any) => {
    let headers: { [key: string]: string } = {
      'X-Bank-Isstrongauthrequest': 'true',
      'Content-Type': 'multipart/form-data',
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
          ? t('transfers.personalTransfer')
          : selectedData || t('transfers.bankingTransferOfBalance'),
      );

      formData.append('extraPurpose', '');
      formData.append('otp', '');
      formData.append('fastPayment', 'false');
      formData.append('bankCode', receiverInfo.bicCode);
      formData.append('bankName', receiverInfo.bankName);
      if (code !== false) {
        headers['X-Bank-Otp'] = code;
      }

      const transferToSomeoneResult = await transferToSomeone({
        headers: headers,
        body: formData,
      });

      closeModal();

      if (transferToSomeoneResult) {
        navigate(TRANSACTION_FINISHED_SCREEN, {});
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

      if (code !== false) {
        requestBody.otp = code;
      }

      const transferToSomeoneResult = await transferToSomeone({
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      closeModal();
      if (transferToSomeoneResult) {
        navigate(TRANSACTION_FINISHED_SCREEN, {});
      }
    }
  };
  const handleTransferError = (error: any) => {
    if ('data' in error) {
      const { data } = error as CustomTransferResultError;
      if (data?.status === 400) {
        navigate(TRANSACTION_FAILED_SCREEN);
      } else {
        console.warn('Transfer Error:', error);
      }
    }
  };
  const handleButtonPress = async () => {
    if (params.convertion && !params.fromOtherBank) {
      try {
        const transferConvertion: TransferToOwnAccountResponseType = await handleExchangeAmount({
          debitAmount: convertionData?.buyAmount.amountBuy,
          creditAmount: convertionData?.buyAmount.amountSell,
          creditAccountId: accountToData?.accountId,
          debitAccountId: accountFromData?.accountId,
        });
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
          element: <OTPModal onFinished={code => transferWithOTP(code, params)} />,
          withKeyboard: true,
        });
      } else {
        await transferWithOTP(false, params);
      }
    } else {
      try {
        const transferResult: TransferToOwnAccountResponseType = await handleTransferToOwnAccount({
          amount: selectedItemFromStore.selectedPrice,
          creditAccountId: accountToData?.accountId,
          debitAccountId: accountFromData?.accountId,
        });

        if (transferResult?.error) {
          handleTransferError(transferResult.error);
        } else {
          navigate(TRANSACTION_FINISHED_SCREEN, {});
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
          {params.fromOtherBank ? (
            <OtherBankList
              selectedItemFromStore={selectedItemFromStore}
              convertion={params.convertion}
            />
          ) : (
            <TransferDetailsList
              selectedItemFromStore={selectedItemFromStore}
              convertion={params.convertion}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button.Primary
          text="გადარიცხვა"
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
