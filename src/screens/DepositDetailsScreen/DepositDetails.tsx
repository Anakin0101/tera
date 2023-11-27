import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { getFormattedDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { Copy, Edit, Note } from 'assets/SVGs';
import { DepositDetailsProps } from './DepositDetailsScreen.types';
import { useStyles } from './DepositDetailsScreen.styles';

export const DepositDetails: FC<DepositDetailsProps> = ({ deposit, copyToClipboard }) => {
  const styles = useStyles();
  return (
    <View style={styles.details}>
      <Text children="products.details" size={18} medium />
      <DetailsItem label="products.name" value={deposit.depositName} icon={<Edit />} />
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
      <Pressable style={styles.agreementButton}>
        <View style={styles.innerContainer}>
          <Note />
          <Text children="deposits.agreementDoc" special />
        </View>
      </Pressable>
    </View>
  );
};
