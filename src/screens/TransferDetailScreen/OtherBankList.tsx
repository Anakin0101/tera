import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { maskIban } from 'utils/maskIban';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';

export const OtherBankList = ({ selectedItemFromStore }: any) => {
  const {
    accountFromData,
    accountToData,
    selectedData,
    selectedPrice,
    selectedOtherBankDataTitle,
  } = selectedItemFromStore;

  const styles = useStyleTheme();

  const renderDetailsItem = (
    label: string,
    value: string | BlockedAmount[] | undefined,
    iban?: string,
  ) => {
    const displayValue = iban ? maskIban(iban) : undefined;
    return <DetailsItem label={label} value={value} iban={displayValue} />;
  };

  const renderTransferDetails = () => {
    return (
      <View style={styles.backgroundWhite}>
        <View style={styles.detailsSectionWrapper}>
          {renderDetailsItem('transfers.fromWhere', ``, accountFromData.accountIban)}
          {renderDetailsItem('transfers.where', `${accountToData.name} `)}
          {renderDetailsItem('personalNumber.Receiver', '', accountToData.iban)}
          {renderDetailsItem('transactionDetails.amount', `${selectedPrice} ₾`)}
          {renderDetailsItem(
            'transfers.destination',
            selectedData ? selectedData : selectedOtherBankDataTitle,
          )}
        </View>
      </View>
    );
  };

  return renderTransferDetails();
};
