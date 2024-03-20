import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';
import { getCurrencyIcon } from 'utils/currency';
import { useTranslation } from 'react-i18next';
export const TransferDetailsList = ({
  selectedItemFromStore,
  convertion,
  debitResult,
  creditResult,
  templateData,
}: any) => {
  const { t } = useTranslation();
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
    const accountName = accountToData?.accountName ? `${accountToData.accountName}  ` : '';
    const renderSelectedData = () => {
      if (selectedData !== '') {
        return renderDetailsItem('transfers.destination', selectedData);
      } else if (convertion) {
        return renderDetailsItem('transfers.destination', 'transfers.convertion');
      } else {
        return renderDetailsItem('transfers.destination', 'transfers.balanceTansfer');
      }
    };

    return (
      <View style={styles.backgroundWhite}>
        {renderDetailsItem(
          'transfers.fromWhere',
          `${debitResult ? debitResult.title : accountFromData?.accountName}  `,
          debitResult ? debitResult?.accountIban : accountFromData?.accountIban,
        )}
        {renderDetailsItem(
          'transfers.where',
          creditResult ? creditResult.title : accountName,
          creditResult
            ? creditResult.accountIban
            : accountToData?.accountIban || accountToData?.iban,
        )}
        {convertion
          ? renderDetailsItem(
              'transactionDetails.amount',
              `${formatToTwoDecimalPlaces(convertionData?.buyAmount?.amountBuy)} ${getCurrencyIcon(
                accountFromData?.ccy,
              )}`,
            )
          : renderDetailsItem(
              'transactionDetails.amount',
              `${formatToTwoDecimalPlaces(
                templateData ? templateData?.amount : selectedPrice,
              )} ${getCurrencyIcon(templateData ? templateData?.ccy : accountFromData?.ccy)}`,
            )}
        {convertion &&
          renderDetailsItem(
            'transfers.acceptable',
            `${formatToTwoDecimalPlaces(convertionData?.buyAmount?.amountSell)}  ${getCurrencyIcon(
              accountToData?.ccy,
            )}`,
          )}
        {convertion &&
          renderDetailsItem(
            'transfers.course',
            `${t('transfers.yourCourse')}${getCurrencyIcon(accountToData?.ccy)} = ${
              specialRateUsed ? specialRate : standardRate
            }${getCurrencyIcon(accountFromData?.ccy)}`,
          )}
        {renderSelectedData()}
      </View>
    );
  };

  return renderTransferDetails();
};
