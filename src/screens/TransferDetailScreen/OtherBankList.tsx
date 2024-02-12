import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { maskIban } from 'utils/maskIban';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';
import { SelectedItemProp } from './TransferDetailScreen.types';

export const OtherBankList = ({
  selectedItemFromStore,
  receiver,
}: {
  selectedItemFromStore: SelectedItemProp;
  receiver?: string;
}) => {
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
          {renderDetailsItem(
            'transfers.fromWhere',
            `${accountFromData.accountName} `,
            accountFromData.accountIban,
          )}
          {renderDetailsItem('transfers.where', `${receiver ? receiver : accountToData.name} `)}
          {renderDetailsItem('personalNumber.Receiver', `${accountToData.iban}`)}
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
