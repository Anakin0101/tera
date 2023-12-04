import React from 'react';
import { View } from 'react-native';
import { Text, Button, IconComponent } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import Images from 'theme/Images';
import { TransferDetailsList } from './TransferDetailsList';
import { verticalScale } from 'utils/config';
import { ConvertionData } from './TransferDetailScreen.types';

export const TransferDetailScreen = () => {
  const styles = useStyleTheme();
  const selectedItemFromStore = useAppSelector(state => state.transfers);

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
          <TransferDetailsList selectedItemFromStore={selectedItemFromStore} />
        </View>
      </View>
      <View style={{ marginTop: verticalScale(100) }}>
        <Button.Primary text="გადარიცხვა" fixedWidth />
      </View>
    </View>
  );
};

export default TransferDetailScreen;
