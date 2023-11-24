import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { formatDate } from 'utils/formatDate';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { Edit } from 'assets/SVGs';
import { LoanDetailsProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';

export const LoanDetails: FC<LoanDetailsProps> = ({ loan }) => {
  const styles = useStyles();

  return (
    <View style={styles.details}>
      <Text children="products.details" size={18} medium />
      <DetailsItem label="loans.name" value={loan.productName} icon={<Edit />} />
      <DetailsItem label="loans.type" value={''} />
      <DetailsItem label="loans.ccy" value={loan.currency} />
      <DetailsItem label="loans.remainingPrincipal" value={''} />
      <DetailsItem
        label="loans.date"
        value={`${formatDate(loan.startDate, 'YYYY')}-${formatDate(loan.endDate, 'YYYY')}`}
      />
      <DetailsItem label="loans.initialAmount" value={''} />
      <DetailsItem label="loans.totalInterest" value={''} />
      <DetailsItem label="loans.annualInterestRage" value={`${loan.interestRate}%`} />
      <DetailsItem label="loans.acc" value={''} />
      <DetailsItem label="loans.saving" value={''} />
    </View>
  );
};
