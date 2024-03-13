import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler, TextInput } from 'react-native';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { Transfer } from './Transfer';
import { CardSwap } from './CardSwap';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Button, LoadingView } from 'components';
import { setSelectedPrice } from 'store/slices/transfers';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TransactionsStackScreenProps, TransactionsStackRouteProps } from 'navigation/types';
import { clearSelectedData } from 'store/slices/transfers';
import { useDispatch } from 'react-redux';
import { Convert } from './Convert';
import { useConvertAmount } from './useConvertAmountBuy';
import { TRANSFER_DETAIL_SCREEN, PRIVATE_TRANSACTION_SCREEN } from 'navigation/ScreenNames';
import { useRoute } from '@react-navigation/native';
import { useTransferDetails } from 'screens/TransferDetailScreen/container';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { formatAndValidateText } from 'utils/formatDecimalAndValidate';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { useAccounts } from 'hooks/useAccounts';
import { AccountDetails } from './CardSwap';
interface AccountData {
  accountId: any;
  availableBalance: number;
  ccy: string;
}

interface TransferToAccountScreenProps {}
interface TemplateData {
  amount: number;
  ccy: string;
}

export const TransferToAccountScreen: React.FC<TransferToAccountScreenProps> = () => {
  const { transferAccounts } = useAccounts();
  const { isKeyboardOpened } = useKeyboard();
  const [debitResult, setDebitResult] = useState<AccountDetails | null>(null);
  const [creditResult, setCreditResult] = useState<AccountDetails | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData | null>(null);
  const [inputValue, setInputValue] = useState('');

  const { params } = useRoute<TransactionsStackRouteProps<'TransferToAccountScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const { handleTransferInfo } = useTransferDetails(false);
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { accountFromData, accountToData, selectedData, selectedPrice } = useAppSelector(
    state => state.transfers,
  ) as unknown as {
    accountFromData: AccountData;
    accountToData: AccountData;
    selectedData: any;
    receiverInfo: any;
    selectedPrice: any;
    invoiceData: any;
    selectedTransactionType: any;
  };

  useEffect(() => {
    if (isFocused && params?.templates) {
      const amount = params.templates.internal?.amount;
      if (amount) {
        setInputValue(amount.toString());
      }
    }
  }, [isFocused, params]);

  useEffect(() => {
    if (isFocused && params?.templates && transferAccounts) {
      if (params.templates.internal) {
        setTemplateData({
          amount: params.templates.internal.amount,
          ccy: params.templates.internal.currency,
        });
      }
      const debitIban =
        params.templates.internal?.debitIban || params.templates.conversion?.debitIban;
      const creditIban =
        params.templates.internal?.creditIban || params.templates.conversion?.creditIban;
      const processResults = (iban: string | undefined, isDebit = true): AccountDetails | null => {
        const sections = transferAccounts.map(group => ({
          title: group.accountName,
          data: group.accounts.filter(account => (isDebit ? account.isDebit : account.isCredit)),
        }));

        const matchingSection = sections.find(section =>
          section.data.some(account => account.accountIban === iban),
        );

        if (matchingSection) {
          const matchingAccount = matchingSection.data.find(
            account => account.accountIban === iban,
          );
          return {
            title: matchingSection.title,
            ...matchingAccount,
            cards: null,
          };
        }
        return null;
      };

      setDebitResult(processResults(debitIban, true));
      setCreditResult(processResults(creditIban, false));
    }

    return () => {
      setDebitResult(null);
      setCreditResult(null);
    };
  }, [isFocused, params, transferAccounts]);

  const [shouldCallApi, setShouldCallApi] = useState(true);
  const { fromOtherBank } = params || {};
  useEffect(() => {
    if (fromOtherBank) {
      setShouldCallApi(false);
    }
  }, [fromOtherBank, accountFromData, accountToData]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedData());
    };
  }, [dispatch]);

  let queryParams = {
    amountBuy: 0.01,
    currencyBuy: accountFromData?.ccy || '',
    currencySell: accountToData?.ccy || '',
  };
  const { buyAmount, buyLoading } = useConvertAmount(queryParams, shouldCallApi);

  const [isButtonDisabled, setIsButtonDisabled] = useState(params?.templates ? false : true);

  const inputRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    setInputValue(text);

    const { isInvalidInput, processedText } = formatAndValidateText({
      text: text,
      decimalPlaces: 2,
      inputRef: inputRef,
    });
    dispatch(setSelectedPrice(processedText));
    setIsButtonDisabled(isInvalidInput);
  };

  const openTransferScreen = () => {
    const convertionValue = accountFromData?.ccy !== accountToData?.ccy;
    if (convertionValue) {
      navigate(PRIVATE_TRANSACTION_SCREEN, {
        from: 'convert',
      });
    } else {
      navigate(PRIVATE_TRANSACTION_SCREEN, {
        from: 'transfer',
      });
    }
  };

  const navigateToTransferDetails = async () => {
    if (isButtonDisabled) {
      return;
    }

    const convertionValue = accountFromData?.ccy !== accountToData?.ccy;
    if (!convertionValue) {
      const response = await handleTransferInfo({
        transferType: FinancialTransferTypeEnum.ToOwnAccount,
        debitAccountId: debitResult?.accountId || accountFromData.accountId,
        amount: templateData?.amount || selectedPrice,
        fastPayment: false,
        ensured: false,
        receiverBankCode: null,
      });
      if (!response?.isSuccess) {
        openToast(`${t('transfers.balanceAvailable')}`, 'error');
        return;
      }
    }
    if (params?.templates) {
      navigate(TRANSFER_DETAIL_SCREEN, {
        convertion: convertionValue,
        fromOtherBank: fromOtherBank,
        debitResult: debitResult,
        creditResult: creditResult,
        templateData: templateData,
      });
    } else {
      navigate(TRANSFER_DETAIL_SCREEN, {
        convertion: convertionValue,
        fromOtherBank: fromOtherBank,
      });
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

  if (buyLoading) {
    return <LoadingView />;
  }

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
        {params?.templates?.internal ? (
          <Transfer
            templateData={{ amount: inputValue }}
            accountFromData={accountFromData}
            selectedData={selectedData}
            onTextChange={handleTextChange}
            inputRef={inputRef}
            openTransferScreen={openTransferScreen}
          />
        ) : params?.templates?.conversion ||
          (accountFromData?.ccy !== accountToData?.ccy && !fromOtherBank) ? (
          <Convert
            accountFromData={accountFromData}
            accountToData={accountToData}
            selectedData={selectedData}
            setIsButtonDisabled={setIsButtonDisabled}
            convertAmount={buyAmount}
            openTransferScreen={openTransferScreen}
          />
        ) : (
          <Transfer
            accountFromData={accountFromData}
            selectedData={selectedData}
            onTextChange={handleTextChange}
            inputRef={inputRef}
            openTransferScreen={openTransferScreen}
          />
        )}

        <CardSwap
          accountFromData={accountFromData}
          accountToData={accountToData}
          creditResult={creditResult}
          debitResult={debitResult}
        />
      </View>
    </KeyboardAvoidingScrollView>
  );
};
