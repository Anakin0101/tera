import React from 'react';
import { View } from 'react-native';
import { Button } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { useNavigation } from '@react-navigation/native';

import { TransferDetailsList } from './TransferDetailsList';
import { verticalScale } from 'utils/config';
import { useRoute } from '@react-navigation/native';
import { TransactionsStackRouteProps, TransactionsStackScreenProps } from 'navigation/types';
import { useTransferDetails } from './container';
import { TRANSACTION_FINISHED_SCREEN } from 'navigation/ScreenNames';
import { ConversionOrTranferDetails } from './ConversionOrTranferDetails';
import { OtherBankList } from './OtherBankList';

import { openModal, closeModal } from 'utils/modal';
import { OTPModal } from 'components';
import { ScrollView } from 'react-native-gesture-handler';
interface SelectedItem {
  selectedPrice: any;
  convertionData: any;
  accountFromData: any;
  accountToData: any;
  receiverInfo: any;
  otpData: any;
  selectedData: any;
}

export const TransferDetailScreen = () => {
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { handleExchangeAmount, handleTransferToOwnAccount, transferToSomeoneMutation } =
    useTransferDetails();

  const { params } = useRoute<TransactionsStackRouteProps<'TransferDetailScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const {
    accountFromData,
    accountToData,
    convertionData,
    selectedPrice,
    receiverInfo,
    otpData,
    selectedData,
  } = selectedItemFromStore;

  const transferWithOTP = async (code: any) => {
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

    const headers: { [key: string]: string } = {
      'X-Bank-Isstrongauthrequest': 'true',
      'Content-Type': 'multipart/form-data',
    };

    if (code !== false) {
      headers['X-Bank-Otp'] = code;
    }

    const transferToSomeoneResult = await transferToSomeoneMutation({
      headers: headers,
      body: formData,
    });

    closeModal();
    if (transferToSomeoneResult) {
      navigate(TRANSACTION_FINISHED_SCREEN, {});
    }
  };

  const handleButtonPress = async () => {
    if (params.convertion && !params.fromOtherBank) {
      try {
        await handleExchangeAmount({
          debitAmount: convertionData?.buyAmount.amountBuy,
          creditAmount: convertionData?.buyAmount.amountSell,
          creditAccountId: accountToData?.accountId,
          debitAccountId: accountFromData?.accountId,
        });
        navigate(TRANSACTION_FINISHED_SCREEN, {
          convertion: true,
        });
      } catch (error) {
        console.error('Exchange Amount Error:', error);
      }
    } else if (params.fromOtherBank) {
      if (otpData.otpRequired) {
        openModal({
          element: <OTPModal onFinished={code => transferWithOTP(code)} />,
        });
      } else {
        await transferWithOTP(false);
      }
    } else {
      try {
        await handleTransferToOwnAccount({
          amount: selectedItemFromStore.selectedPrice,
          creditAccountId: accountToData?.accountId,
          debitAccountId: accountFromData?.accountId,
        });
        navigate(TRANSACTION_FINISHED_SCREEN, {});
      } catch (error) {
        console.error('Transfer to Own Account Error:', error);
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
      <View style={{ marginTop: verticalScale(30) }}>
        <Button.Primary
          text="გადარიცხვა"
          fixedWidth
          onPress={() => {
            handleButtonPress();
          }}
        />
      </View>
    </ScrollView>
  );
};
