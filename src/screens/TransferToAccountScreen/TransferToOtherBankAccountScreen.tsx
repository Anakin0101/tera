import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler, TextInput } from 'react-native';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { Transfer } from './Transfer';
import { CardSwap } from './CardSwap';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Button } from 'components';
import { setSelectedPrice, setOtpData } from 'store/slices/transfers/indext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TransactionsStackScreenProps, TransactionsStackRouteProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { TRANSFER_DETAIL_SCREEN, PRIVATE_TRANSACTION_SCREEN } from 'navigation/ScreenNames';
import { useRoute } from '@react-navigation/native';
import { useTransferDetails } from 'screens/TransferDetailScreen/container';

interface AccountData {
  iban: any;
  accountId: any;
  ccy: string;
}

interface TransferToAccountScreenProps {}

export const TransferToOtherBankAccountScreen: React.FC<TransferToAccountScreenProps> = () => {
  const { params } = useRoute<TransactionsStackRouteProps<'TransferToAccountScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const { handleTransferInfo, transferToSomeoneMutation } = useTransferDetails();

  const { accountFromData, accountToData, selectedData, receiverInfo, selectedPrice, invoiceData } =
    useAppSelector(state => state.transfers) as unknown as {
      accountFromData: AccountData;
      accountToData: AccountData;
      selectedData: any;
      receiverInfo: any;
      selectedPrice: any;
      invoiceData: any;
    };

  const { fromOtherBank } = params;

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  const handleTextChange = (text: string) => {
    dispatch(setSelectedPrice(text));
    setIsButtonDisabled(!text || text.trim() === '');
  };

  const openTransferScreen = () => {
    navigate(PRIVATE_TRANSACTION_SCREEN, {
      from: 'other',
    });
  };
  const navigateToTransferDetails = async () => {
    if (isButtonDisabled) {
      return;
    }

    if (params.fromOtherBank) {
      try {
        await handleTransferInfo({
          transferType: receiverInfo.ibanIsValid ? 3 : 2,
          debitAccountId: accountFromData.accountId,
          amount: selectedPrice,
          fastPayment: false,
          ensured: false,
          receiverBankCode: receiverInfo.bicCode,
        });
        const formData = new FormData();
        formData.append('debitAccountId', accountFromData.accountId);
        formData.append('receiverIban', accountToData.iban);
        formData.append('amount', selectedPrice);
        formData.append('receiverName', receiverInfo.customerName);
        formData.append('purpose', selectedData);
        formData.append('extraPurpose', '');
        formData.append('otp', '');
        formData.append('fastPayment', 'false');
        formData.append('bankCode', receiverInfo.bicCode);
        formData.append('bankName', receiverInfo.bankName);
        formData.append('invoice', invoiceData);

        const transferToSomeoneResult = await transferToSomeoneMutation({
          headers: {
            'X-Bank-Isstrongauthrequest': 'true',
            'X-Bank-Getauthmethod': 'true',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (transferToSomeoneResult && 'data' in transferToSomeoneResult) {
          dispatch(setOtpData(transferToSomeoneResult.data));

          navigate(TRANSFER_DETAIL_SCREEN, {
            convertion: false,
            fromOtherBank: fromOtherBank,
          });
        } else {
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
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
      />
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
