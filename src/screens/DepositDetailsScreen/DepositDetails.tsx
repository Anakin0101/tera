import React, { FC } from 'react';
import { View } from 'react-native';
import { Badge, Text } from 'components';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { formatDate, getDaysDifference, getFormattedDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { Alert, Copy } from 'assets/SVGs';
import { DepositDetailsProps } from './DepositDetailsScreen.types';
import { useStyles } from './DepositDetailsScreen.styles';

export const DepositDetails: FC<DepositDetailsProps> = ({ deposit, copyToClipboard }) => {
  const styles = useStyles();
  const diff = getDaysDifference(deposit.endDate);

  return (
    <View style={styles.details}>
      <Text children="products.details" size={18} medium />
      {diff > 0 && diff <= 10 ? (
        <View style={styles.durationContainer}>
          <DetailsItem label="deposits.endDate" value={formatDate(deposit.endDate, ' YYYY')} />
          <Badge
            icon={<Alert />}
            label="deposits.willBeCancelled"
            translateProps={{ value: diff }}
            style={styles.badgeContainer}
          />
        </View>
      ) : null}
      <DetailsItem
        icon={<Copy />}
        value={deposit.iban}
        label="products.accountNumber"
        onPress={() => copyToClipboard(deposit.iban, 'products.clipboard')}
      />
      <DetailsItem
        icon={<Copy />}
        value={deposit.agreementNumber}
        label="deposits.agreementNumber"
        onPress={() => copyToClipboard(deposit.agreementNumber, 'deposits.agreementNumCopied')}
      />
      <DetailsItem label="deposits.startDate" value={getFormattedDate(deposit.startDate)} />
      <DetailsItem label="deposits.period" value={String(deposit.period)} />
      <DetailsItem label="deposits.depositType" value={deposit.depositType} />
      <DetailsItem
        label="deposits.interestRate"
        value={`${formatMoney(deposit.interestPercent)} %`}
      />
      <DetailsItem
        label="deposits.accruedBenefit"
        value={formatMoney(deposit.totalAccrualPercent)}
      />
      <DetailsItem label="deposits.utilizedBenefits" value={formatMoney(deposit.nominalAmount)} />
    </View>
  );
};
