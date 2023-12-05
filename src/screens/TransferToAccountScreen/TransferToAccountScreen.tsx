/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler, TextInput } from 'react-native';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { Transfer } from './Transfer';
import { CardSwap } from './CardSwap';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Button } from 'components';
import { setSelectedPrice } from 'store/slices/transfers/indext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { Convert } from './Convert';
import { useConvertAmount } from './useConvertAmountBuy';
import { TRANSFER_DETAIL_SCREEN, PRIVATE_TRANSACTION_SCREEN } from 'navigation/ScreenNames';
interface AccountData {
  ccy: string;
}

interface TransferToAccountScreenProps {}

export const TransferToAccountScreen: React.FC<TransferToAccountScreenProps> = () => {
  const { accountFromData, accountToData, selectedData, selectedItem } = useAppSelector(
    state => state.transfers,
  ) as unknown as {
    accountFromData: AccountData;
    accountToData: AccountData;
    selectedData: any;
    selectedItem: any;
  };

  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  let queryParams = {
    amountBuy: 0.01,
    currencyBuy: accountFromData?.ccy || '',
    currencySell: accountToData?.ccy || '',
  };
  const { buyAmount } = useConvertAmount(queryParams);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  const handleTextChange = (text: string) => {
    dispatch(setSelectedPrice(text));
    setIsButtonDisabled(!text || text.trim() === '');
  };

  const openTransferScreen = () => {
    navigate(PRIVATE_TRANSACTION_SCREEN);
  };

  const navigateToTransferDetails = () => {
    if (accountFromData?.ccy !== accountToData?.ccy) {
      navigate(TRANSFER_DETAIL_SCREEN, {
        convertion: true,
      });
    } else {
      navigate(TRANSFER_DETAIL_SCREEN, {
        convertion: false,
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

  return (
    <View style={styles.container}>
      {accountFromData?.ccy !== accountToData?.ccy ? (
        <Convert
          accountFromData={accountFromData}
          accountToData={accountToData}
          selectedData={selectedData}
          selectedItem={selectedItem}
          setIsButtonDisabled={setIsButtonDisabled}
          convertAmount={buyAmount}
          openTransferScreen={openTransferScreen}
        />
      ) : (
        <Transfer
          selectedData={selectedData}
          selectedItem={selectedItem}
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
          onPress={navigateToTransferDetails}
        />
      </View>
    </View>
  );
};

//შეცვალე აიქონი
