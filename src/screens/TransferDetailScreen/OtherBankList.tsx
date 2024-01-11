import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';
import { useTranslation } from 'react-i18next';

export const OtherBankList = ({ selectedItemFromStore }: any) => {
  const { accountFromData, accountToData, selectedData, selectedPrice } = selectedItemFromStore;

  const styles = useStyleTheme();
  const { t } = useTranslation();

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
            'transfers.fromWhere',
            `${accountFromData.accountName} - `,
            accountFromData.accountIban,
          )}
          {renderDetailsItem('transfers.where', `${accountToData.name} `)}
          {renderDetailsItem('personalNumber.Receiver', `${accountToData.iban}`)}
          {renderDetailsItem('transactionDetails.amount', `${selectedPrice} ₾`)}
          {renderDetailsItem(
            'transfers.destination',
            selectedData ? selectedData : t('transfers.personalTransfer'),
          )}
        </View>
      </View>
    );
  };

  return renderTransferDetails();
};
