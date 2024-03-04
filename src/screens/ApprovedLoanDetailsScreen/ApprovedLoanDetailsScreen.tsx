import React from 'react';
import { ScrollView } from 'react-native';
import { Button, DetailsItem } from 'components/index';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { useStyles } from './ApprovedLoanDetailsScreen.styles';
import { useApproveLoanDetails } from './container';

export const ApprovedLoanDetailsScreen = () => {
  const styles = useStyles();
  const { handlePress } = useApproveLoanDetails();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <DetailsItem label="approvedLoan.amount" value={formatMoney(10000, CurrencyEnum.GEL)} />
      <DetailsItem label="approvedLoan.annualInterestRate" value="17.00%" />
      <DetailsItem label="approvedLoan.effectiveInterestRate" value="22.00%" />
      <DetailsItem label="approvedLoan.term" value={formatDate('2024-02-29T21:22:28.081Z')} />
      <DetailsItem
        label="approvedLoan.monthlyContribution"
        value={formatMoney(100, CurrencyEnum.GEL)}
      />
      <DetailsItem
        label="approvedLoan.issuingCommission"
        value={formatMoney(100, CurrencyEnum.GEL)}
      />
      <DetailsItem
        label="approvedLoan.prepaymentFee"
        value={
          '6-დან 12 თვემდე -წინსწრების თანხის 0,5%:\n12-დან 21 თვემდე -წინსწრების თანხის 1%:\n24 თვეზემეტი  წინსწრების თანხის 2%:'
        }
      />
      <DetailsItem
        label="approvedLoan.validPeriod"
        value={formatDate('2024-03-01T21:22:28.081Z')}
      />
      <Button.Primary
        onPress={handlePress}
        text="common.next"
        fullWidth
        customWrapperStyle={styles.button}
      />
    </ScrollView>
  );
};
