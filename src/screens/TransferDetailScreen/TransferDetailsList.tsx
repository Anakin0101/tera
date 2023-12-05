import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';

export const TransferDetailsList = ({ selectedItemFromStore, convertion }: any) => {
  const {
    accountFromData,
    accountToData,
    selectedItem,
    selectedData,
    selectedPrice,
    convertionData,
  } = selectedItemFromStore;

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
            ? renderDetailsItem('თანხა', `${convertionData.buyAmount.amountBuy} ₾`)
            : renderDetailsItem('თანხა', `${selectedPrice} ₾`)}
          {convertion && renderDetailsItem('მისაღები', `${convertionData.buyAmount.amountSell} ₾`)}
          {convertion &&
            renderDetailsItem('კურსი', `შენი კურსი 1$= ${convertionData.buyAmount.specialRate} ₾`)}
          {renderDetailsItem('დანიშნულება', !selectedData ? selectedItem.name : selectedData)}
        </View>
      </View>
    );
  };

  return renderTransferDetails();
};
