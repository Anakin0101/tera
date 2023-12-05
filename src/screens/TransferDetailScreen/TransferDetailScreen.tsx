import React from 'react';
import { View } from 'react-native';
import { Text, Button, IconComponent } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { useNavigation } from '@react-navigation/native';
import Images from 'theme/Images';
import { TransferDetailsList } from './TransferDetailsList';
import { verticalScale } from 'utils/config';
import { ConvertionData } from './TransferDetailScreen.types';
import { useRoute } from '@react-navigation/native';
import { TransactionsStackRouteProps, TransactionsStackScreenProps } from 'navigation/types';
import { useTransferDetails } from './container';
import { TRANSACTION_FINISHED_SCREEN } from 'navigation/ScreenNames';

interface SelectedItem {
  selectedPrice: any;
  convertionData: any;
  accountFromData: any;
  accountToData: any;
}

export const TransferDetailScreen = () => {
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { handleExchangeAmount, handleTransferToOwnAccount } = useTransferDetails();
  const { params } = useRoute<TransactionsStackRouteProps<'TransferDetailScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferDetailScreen'>>();
  const { accountFromData, accountToData, convertionData } = selectedItemFromStore;

  const handleButtonPress = async () => {
    if (params.convertion) {
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

  if (!selectedItemFromStore?.convertionData) {
    return null;
  }

  const { buyAmount } = selectedItemFromStore?.convertionData as ConvertionData;

  const getCurrencySymbol = (currency: any) => {
    switch (currency) {
      case 'GEL':
        return '₾';
      case 'USD':
        return '$';

      default:
        return currency;
    }
  };

  const renderConversionDetails = () => {
    return (
      <View style={styles.card}>
        <IconComponent
          pngLocalIcon={Images().LiabilitiesIcon}
          customIconComponentStyles={styles.customIconComponentStyles}
        />
        <View>
          <Text children="transfers.account" style={styles.textLabel} />
          <View style={styles.buyWrapper}>
            <Text
              children={`${buyAmount.amountBuy} ${getCurrencySymbol(buyAmount.currencyBuy)} = `}
              style={styles.text}
            />
            <Text
              children={`${buyAmount.amountSell} ${getCurrencySymbol(buyAmount.currencySell)} `}
              style={styles.text}
            />
          </View>
          <Text
            children="transfers.yourCurrency"
            style={styles.text}
            translateProp={{
              currency: `${getCurrencySymbol(buyAmount.currencySell)}`,
              value: ` ${buyAmount?.specialRate} ${getCurrencySymbol(buyAmount.currencyBuy)}`,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>{renderConversionDetails()}</View>
      <View style={styles.details}>
        <View style={styles.wrapper}>
          <TransferDetailsList
            selectedItemFromStore={selectedItemFromStore}
            convertion={params.convertion}
          />
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
    </View>
  );
};
