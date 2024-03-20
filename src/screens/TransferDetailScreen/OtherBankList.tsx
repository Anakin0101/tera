import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { maskIban } from 'utils/maskIban';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';
import { SelectedItemProp } from './TransferDetailScreen.types';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';

export const OtherBankList = ({
  selectedItemFromStore,
  receiver,
  mobileTransaction,
  fastPaymentFee,
  fee,
}: {
  selectedItemFromStore: SelectedItemProp;
  receiver?: string;
  mobileTransaction?: boolean;
  fastPaymentFee?: number;
  fee?: number;
}) => {
  const {
    accountFromData,
    accountToData,
    selectedData,
    selectedPrice,
    accountIban,
    selectedOtherBankDataTitle,
    selectedTransactionType,
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
          {mobileTransaction
            ? renderDetailsItem(
                'personalNumber.mobile',
                `${maskIban(accountIban?.accountIbanId) || accountToData.iban}`,
              )
            : renderDetailsItem(
                'personalNumber.RecepientIban',
                `${maskIban(accountIban?.accountIbanId) || maskIban(accountToData.iban)}`,
              )}
          {renderDetailsItem(
            'transactionDetails.amount',
            `${formatToTwoDecimalPlaces(selectedPrice)} ₾`,
          )}
          {fee !== 0 && renderDetailsItem('common.totalFee', `${fee} ₾`)}
          {fastPaymentFee !== 0 && renderDetailsItem('transactions.fastFee', `${fastPaymentFee} ₾`)}
          {renderDetailsItem(
            'transfers.destination',
            selectedData ? selectedData : selectedOtherBankDataTitle,
          )}
          {selectedTransactionType.name &&
            renderDetailsItem(
              'transactionDetails.type',
              selectedTransactionType.name && selectedTransactionType.name,
            )}
        </View>
      </View>
    );
  };

  return renderTransferDetails();
};
