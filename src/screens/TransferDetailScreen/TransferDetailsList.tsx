import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';

export const TransferDetailsList = ({ selectedItemFromStore, convertion }: any) => {
  const { accountFromData, accountToData, selectedData, selectedPrice, convertionData } =
    selectedItemFromStore;
  const { specialRate, specialRateUsed, standardRate } = convertionData?.buyAmount || {};

  const styles = useStyleTheme();

  const renderDetailsItem = (
    label: string,
    value: string | BlockedAmount[] | undefined,
    iban?: string,
  ) => {
    return <DetailsItem label={label} value={value} iban={iban} />;
  };

  const renderTransferDetails = () => {
    return (
      <View style={styles.backgroundWhite}>
        <View style={styles.detailsSectionWrapper}>
          {renderDetailsItem(
            'საიდან',
            `${accountFromData.accountName} - `,
            accountFromData.accountIban,
          )}
          {renderDetailsItem('სად', `${accountToData.accountName} -`, accountToData.accountIban)}
          {convertion
            ? renderDetailsItem(
                'თანხა',
                `${formatToTwoDecimalPlaces(convertionData.buyAmount.amountBuy)} ₾`,
              )
            : renderDetailsItem('თანხა', `${formatToTwoDecimalPlaces(selectedPrice)} ₾`)}
          {convertion &&
            renderDetailsItem(
              'მისაღები',
              `${formatToTwoDecimalPlaces(convertionData.buyAmount.amountSell)} ₾`,
            )}
          {convertion &&
            renderDetailsItem(
              'კურსი',
              `შენი კურსი 1$= ${specialRateUsed ? specialRate : standardRate} ₾`,
            )}
          {renderDetailsItem('დანიშნულება', selectedData)}
        </View>
      </View>
    );
  };

  return renderTransferDetails();
};
