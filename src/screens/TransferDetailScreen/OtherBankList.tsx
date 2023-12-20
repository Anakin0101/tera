import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';

export const OtherBankList = ({ selectedItemFromStore }: any) => {
  const { accountFromData, accountToData, selectedData, selectedPrice } = selectedItemFromStore;

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
          {renderDetailsItem('სად', `${accountToData.name} `)}
          {renderDetailsItem('მიმღების ანგარიში', `${accountToData.iban}`)}
          {renderDetailsItem('თანხა', `${selectedPrice} ₾`)}
          {renderDetailsItem('დანიშნულება', selectedData)}
        </View>
      </View>
    );
  };

  return renderTransferDetails();
};
