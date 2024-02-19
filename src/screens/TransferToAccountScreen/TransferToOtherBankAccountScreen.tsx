import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler, TextInput } from 'react-native';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { Transfer } from './Transfer';
import { CardSwap } from './CardSwap';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Button } from 'components';
import { setSelectedPrice, setOtpData } from 'store/slices/transfers';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TransactionsStackScreenProps, TransactionsStackRouteProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { TRANSFER_DETAIL_SCREEN, PRIVATE_TRANSACTION_SCREEN } from 'navigation/ScreenNames';
import { OTHER_BANK, TRANSFER_TERA } from 'constants/transactionConstants';
import { useRoute } from '@react-navigation/native';
import { useTransferDetails } from 'screens/TransferDetailScreen/container';
import { clearSelectedData } from 'store/slices/transfers';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { TransferData, AccountData } from './TransferToAccountScreen.types';
import { transactionTitles } from 'utils/transactionUtils';
import { PERSONAL_TRANSACTION } from 'utils/transactionUtils';
import { TERRA_BANK_CODE } from 'constants/BankCodes';
import { formatAndValidateText } from 'utils/formatDecimalAndValidate';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';

export const TransferToOtherBankAccountScreen = () => {
  const { params } = useRoute<TransactionsStackRouteProps<'TransferToAccountScreen'>>();
  const { fromOtherBank, fromMobile, receiver } = params;
  const { t } = useTranslation();
  const { navigate, setOptions } =
    useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const { handleTransferInfo, transferToSomeone } = useTransferDetails(!!fromMobile);

  const formattedTransactionTitle = transactionTitles[fromMobile ? 'fromMobile' : 'defaultTitle'];

  const {
    accountFromData,
    accountToData,
    selectedData,
    receiverInfo,
    selectedPrice,
    invoiceData,
    selectedTransactionType,
  } = useAppSelector(state => state.transfers) as unknown as {
    accountFromData: AccountData;
    accountToData: AccountData;
    selectedData: any;
    receiverInfo: any;
    selectedPrice: any;
    invoiceData: any;
    selectedTransactionType: any;
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const navigationOptions =
      receiverInfo?.bicCode === TERRA_BANK_CODE ? TRANSFER_TERA : OTHER_BANK;
    setOptions({ title: navigationOptions });
  }, [receiverInfo?.bankName, setOptions, receiverInfo?.bicCode]);

  const handleTextChange = (text: string) => {
    const { isInvalidInput, processedText } = formatAndValidateText({
      text: text,
      decimalPlaces: 2,
      inputRef: inputRef,
    });

    // Check for balance and update the button's disabled state

    dispatch(setSelectedPrice(processedText));
    setIsButtonDisabled(isInvalidInput);
  };

  useEffect(() => {
    return () => {
      dispatch(clearSelectedData());
    };
  }, [dispatch]);
  const openTransferScreen = () => {
    navigate(PRIVATE_TRANSACTION_SCREEN, {
      from: 'other',
    });
  };
  const navigateToTransferDetails = async () => {
    if (isButtonDisabled) {
      return;
    }
    try {
      const transferType = fromMobile
        ? FinancialTransferTypeEnum.ToSomeoneInsideBank
        : receiverInfo.ibanIsValid
        ? FinancialTransferTypeEnum.ToSomeoneInsideBank
        : FinancialTransferTypeEnum.Exchange;

      const transferData: TransferData = {
        debitAccountId: accountFromData.accountId,
        receiverIban: accountToData.iban,
        amount: selectedPrice,
        receiverName: receiverInfo?.customerName || receiverInfo,
        purpose: selectedData.length > 0 ? selectedData : PERSONAL_TRANSACTION,
        extraPurpose: '',
        otp: '',
        fastPayment: selectedTransactionType.isFast,
        bankCode: receiverInfo.bicCode,
        bankName: receiverInfo.bankName,
        saveAsTemplateName: '',
        invoice: invoiceData,
      };

      if (fromMobile && accountToData.iban) {
        transferData.mobile = accountToData.iban;
        const transferToSomeoneResult = await transferToSomeone({
          headers: {
            'X-Bank-Isstrongauthrequest': 'true',
            'X-Bank-Getauthmethod': 'true',
          },
          body: transferData,
        });

        if (transferToSomeoneResult && 'data' in transferToSomeoneResult) {
          dispatch(setOtpData(transferToSomeoneResult.data));

          navigate(TRANSFER_DETAIL_SCREEN, {
            convertion: false,
            fromOtherBank: fromOtherBank,
            mobileTransaction: true,
            receiver: receiver,
          });
        } else {
          openToast(t('authErrors.tryAgain'), 'error');
        }
      } else {
        await handleTransferInfo({
          transferType,
          debitAccountId: accountFromData.accountId,
          amount: selectedPrice,
          fastPayment: false,
          ensured: false,
          receiverBankCode: receiverInfo.bicCode,
        });

        const formData = new FormData();
        for (const [key, value] of Object.entries(transferData)) {
          formData.append(key, value);
        }

        const transferToSomeoneResult = await transferToSomeone({
          headers: {
            'X-Bank-Isstrongauthrequest': 'true',
            'X-Bank-Getauthmethod': 'true',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (transferToSomeoneResult && 'data' in transferToSomeoneResult) {
          if (accountFromData?.availableBalance < selectedPrice) {
            openToast(`${t('transfers.balanceAvailable')}`, 'error');
            return;
          }
          dispatch(setOtpData(transferToSomeoneResult.data));

          navigate(TRANSFER_DETAIL_SCREEN, {
            convertion: false,
            fromOtherBank: fromOtherBank,
            receiver: receiver,
          });
        } else {
          openToast(t('authErrors.tryAgain'), 'error');
        }
      }
    } catch (error) {
      console.warn('Error during API call:', error);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  const styles = useStyleTheme();

  return (
    <View style={styles.container}>
      <Transfer
        accountFromData={accountFromData}
        selectedData={selectedData}
        fromOtherBanks
        onTextChange={handleTextChange}
        inputRef={inputRef}
        openTransferScreen={openTransferScreen}
        transactionTitle={formattedTransactionTitle as keyof typeof transactionTitles}
      />
      <CardSwap
        accountFromData={accountFromData}
        accountToData={accountToData}
        receiver={receiver}
        fromOtherBanks
      />
      <View style={styles.buttonView}>
        <Button.Primary
          text="onboarding.next"
          fullWidth
          disabled={isButtonDisabled}
          onPress={navigateToTransferDetails}
        />
      </View>
    </View>
  );
};
