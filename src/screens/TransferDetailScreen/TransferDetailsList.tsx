import React from 'react';

import { View } from 'react-native';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';

export const TransferDetailsList = ({ selectedItemFromStore }: any) => {
  const { accountFromData, accountToData, selectedItem, selectedData, selectedPrice } =
    selectedItemFromStore;
  const styles = useStyleTheme();
  return (
    <>
      <View style={styles.backgroundWhite}>
        <View style={styles.detailsSectionWrapper}>
          <DetailsItem
            label="საიდან"
            card={accountFromData.accountName}
            value={accountFromData.accountIban}
            //   onPress={handleChangeName}
          />
          <DetailsItem
            label="სად"
            card={accountToData.accountName}
            value={accountToData.accountIban}
            //   onPress={copyIban}
          />
          <DetailsItem
            label="თანხა"
            value={`${selectedPrice} ₾`}
            //   onPress={copyIban}
          />
          <DetailsItem
            label="დანიშნულება"
            value={!selectedData ? selectedItem.name : selectedData}
            //   onPress={copyIban}
          />
        </View>
      </View>
    </>
  );
};
