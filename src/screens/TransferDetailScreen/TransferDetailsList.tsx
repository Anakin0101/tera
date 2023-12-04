import React from 'react';

import { View } from 'react-native';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';

export const TransferDetailsList = ({ selectedItemFromStore }: any) => {
  const {
    accountFromData,
    accountToData,
    selectedItem,
    selectedData,
    selectedPrice,
    convertionData,
  } = selectedItemFromStore;
  const styles = useStyleTheme();
  return (
    <>
      <View style={styles.backgroundWhite}>
        <View style={styles.detailsSectionWrapper}>
          <DetailsItem
            label="საიდან"
            card={accountFromData.accountName}
            value={accountFromData.accountIban}
          />
          <DetailsItem
            label="სად"
            card={accountToData.accountName}
            value={accountToData.accountIban}
          />
          {convertionData.buyAmount ? (
            <DetailsItem label="თანხა" value={`${convertionData.buyAmount.amountBuy} ₾`} />
          ) : (
            <DetailsItem label="თანხა" value={`${selectedPrice} ₾`} />
          )}
          {convertionData.buyAmount && (
            <DetailsItem label="მისაღები" value={`${convertionData.buyAmount.amountSell} ₾`} />
          )}
          {convertionData.buyAmount && (
            <DetailsItem
              label="კურსი"
              value={`შენი კურსი 1$= ${convertionData.buyAmount.specialRate} ₾`}
            />
          )}
          <DetailsItem
            label="დანიშნულება"
            value={!selectedData ? selectedItem.name : selectedData}
          />
        </View>
      </View>
    </>
  );
};
