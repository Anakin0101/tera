import React from 'react';
import { View } from 'react-native';
import { Text, IconComponent } from 'components';
import Images from 'theme/Images';
import { getCurrencyIcon } from 'utils/currency';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';
export const ConversionOrTranferDetails = ({
  buyAmount,
  params,
  selectedPrice,
  accountFromData,
}: any) => {
  const styles = useStyleTheme();
  const { specialRate, specialRateUsed, standardRate } = buyAmount || {};

  return (
    <>
      {params.fromOtherBank ? (
        <View style={styles.card}>
          <IconComponent
            pngLocalIcon={Images().LiabilitiesIcon}
            customIconComponentStyles={styles.customIconComponentStyles}
          />
          <View>
            <Text children="ტერაში გადარიცხვა" style={styles.textLabel} />
            <Text
              children={`${formatToTwoDecimalPlaces(selectedPrice)} ${getCurrencyIcon(
                accountFromData.ccy,
              )}`}
              style={styles.text}
            />
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <IconComponent
            pngLocalIcon={Images().LiabilitiesIcon}
            customIconComponentStyles={styles.customIconComponentStyles}
          />
          <View>
            <Text children="transfers.account" style={styles.textLabel} />
            {params.convertion && (
              <View style={styles.buyWrapper}>
                <Text
                  children={`${formatToTwoDecimalPlaces(buyAmount.amountBuy)} ${getCurrencyIcon(
                    buyAmount.currencyBuy,
                  )} = `}
                  style={styles.textBuyAmount}
                />
                <Text
                  children={`${formatToTwoDecimalPlaces(buyAmount.amountSell)} ${getCurrencyIcon(
                    buyAmount.currencySell,
                  )} `}
                  style={styles.textBuyAmount}
                />
              </View>
            )}
            {params.convertion ? (
              <Text
                children="transfers.yourCurrency"
                style={styles.textYourCourse}
                translateProp={{
                  currency: `${getCurrencyIcon(buyAmount.currencyBuy)}`,
                  value: ` ${
                    specialRateUsed
                      ? formatToTwoDecimalPlaces(specialRate)
                      : formatToTwoDecimalPlaces(standardRate)
                  } ${getCurrencyIcon(buyAmount.currencySell)}`,
                }}
              />
            ) : (
              <Text
                children={`${formatToTwoDecimalPlaces(selectedPrice)} ${getCurrencyIcon(
                  accountFromData.ccy,
                )}`}
                style={styles.text}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};
