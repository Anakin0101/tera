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

interface AccountData {
  accountId: any;
  availableBalance: number;
  ccy: string;
}

interface TransferToAccountScreenProps {}

export const TransferToAccountScreen: React.FC<TransferToAccountScreenProps> = () => {
  const { params } = useRoute<TransactionsStackRouteProps<'TransferToAccountScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const { handleTransferInfo } = useTransferDetails(false);
  const { t } = useTranslation();

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
  const dispatch = useDispatch();
  const [shouldCallApi, setShouldCallApi] = useState(true);
  const { fromOtherBank } = params;
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

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

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
      await handleTransferInfo({
        transferType: FinancialTransferTypeEnum.ToOwnAccount,
        debitAccountId: accountFromData.accountId,
        amount: selectedPrice,
        fastPayment: false,
        ensured: false,
        receiverBankCode: null,
      });
    }
    if (accountFromData?.availableBalance < selectedPrice) {
      openToast(`${t('transfers.balanceAvailable')}`, 'error');
      return;
    }
    navigate(TRANSFER_DETAIL_SCREEN, {
      convertion: convertionValue,
      fromOtherBank: fromOtherBank,
    });
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
    <View style={styles.container}>
      {accountFromData?.ccy !== accountToData?.ccy && !fromOtherBank ? (
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

      <CardSwap accountFromData={accountFromData} accountToData={accountToData} />
      <View style={styles.buttonView}>
        <Button.Primary
          text="onboarding.next"
          fullWidth
          disabled={isButtonDisabled}
          hitSlop={30}
          onPress={navigateToTransferDetails}
        />
      </View>
    </View>
  );
};
