import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler, TextInput } from 'react-native';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { Transfer } from './Transfer';
import { CardSwap } from './CardSwap';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Button } from 'components';
import { setSelectedPrice, setOtpData } from 'store/slices/transfers';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import {
  TRANSFER_DETAIL_SCREEN,
  PRIVATE_TRANSACTION_SCREEN,
  MODAL_STACK,
} from 'navigation/ScreenNames';
import { OTHER_BANK, TRANSFER_TERA } from 'constants/transactionConstants';
import { useRoute } from '@react-navigation/native';
import { useTransferDetails } from 'screens/TransferDetailScreen/container';
import { clearSelectedData } from 'store/slices/transfers';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { TransferData, AccountData } from './TransferToAccountScreen.types';
import { TERRA_BANK_CODE } from 'constants/BankCodes';
import { formatAndValidateText } from 'utils/formatDecimalAndValidate';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';

export const TransferToOtherBankAccountScreen = () => {
  const { isKeyboardOpened } = useKeyboard();
  const { params } = useRoute<ModalStackRouteProps<'TransferToAccountScreen'>>();
  const { fromOtherBank, fromMobile, receiver } = params;
  const { t } = useTranslation();

  const PERSONAL_TRANSACTION = t('transactions.defaultTitle');
  const { navigate, setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { handleTransferInfo, transferToSomeone } = useTransferDetails(!!fromMobile);

  const transactionTitles = {
    fromMobile: t('transactions.fromMobile'),
    defaultTitle: t('transactions.defaultTitle'),
  };
  const formattedTransactionTitle = transactionTitles[fromMobile ? 'fromMobile' : 'defaultTitle'];

  const {
    accountFromData,
    accountToData,
    selectedData,
    receiverInfo,
    selectedPrice,
    invoiceData,
    selectedTransactionType,
    accountIban,
    receiverName,
  } = useAppSelector(state => state.transfers) as unknown as {
    accountFromData: AccountData;
    accountToData: AccountData;
    selectedData: any;
    receiverInfo: any;
    selectedPrice: any;
    invoiceData: any;
    selectedTransactionType: any;
    accountIban: {
      accountIbanId: string;
    };
    receiverName: string;
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

    dispatch(setSelectedPrice(processedText));
    setIsButtonDisabled(isInvalidInput);
  };

  useEffect(() => {
    return () => {
      dispatch(clearSelectedData());
    };
  }, [dispatch]);
  const openTransferScreen = () => {
    navigate(MODAL_STACK, {
      screen: PRIVATE_TRANSACTION_SCREEN,
      params: { from: 'other' },
    });
  };
  const navigateToTransferDetails = async () => {
    if (isButtonDisabled) {
      return;
    }
    try {
      const transferType = fromMobile
        ? FinancialTransferTypeEnum.ToSomeoneInsideBank
        : receiverInfo.ibanIsValid && receiverInfo.ibanisInternal
        ? FinancialTransferTypeEnum.ToSomeoneInsideBank
        : FinancialTransferTypeEnum.ToSomeoneInGeorgia;

      const transferData: TransferData = {
        debitAccountId: accountFromData.accountId,
        receiverIban: accountIban ? accountIban.accountIbanId : accountToData.iban,
        amount: selectedPrice,
        receiverName: receiverInfo?.customerName || receiverName,
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

          navigate(MODAL_STACK, {
            screen: TRANSFER_DETAIL_SCREEN,
            params: {
              convertion: false,
              fromOtherBank: fromOtherBank,
              mobileTransaction: true,
              receiver: receiver,
            },
          });
        } else {
          openToast(t('authErrors.tryAgain'), 'error');
        }
      } else {
        const response = await handleTransferInfo({
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

          navigate(MODAL_STACK, {
            screen: TRANSFER_DETAIL_SCREEN,
            params: {
              convertion: false,
              fromOtherBank: fromOtherBank,
              receiver: receiver,
              fastPaymentFee: response?.data?.fastPaymentFee,
              fee: response?.data?.fee,
            },
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
    <KeyboardAvoidingScrollView
      scrollEnabled={isKeyboardOpened}
      containerStyle={styles.keyboardContainer}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text="onboarding.next"
            fullWidth
            disabled={isButtonDisabled}
            hitSlop={15}
            onPress={navigateToTransferDetails}
          />
        </View>
      }
    >
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
          fromMobile={fromMobile}
        />
      </View>
    </KeyboardAvoidingScrollView>
  );
};
