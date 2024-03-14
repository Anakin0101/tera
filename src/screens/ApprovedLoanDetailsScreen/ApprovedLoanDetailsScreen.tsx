import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, DetailsItem, LoadingInView } from 'components/index';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { useApproveLoanDetails } from './container';
import { SPACED_YEAR } from 'constants/DateTemplates';
import { useStyles } from './ApprovedLoanDetailsScreen.styles';

export const ApprovedLoanDetailsScreen = () => {
  const styles = useStyles();
  const { handlePress, isLoadingDetails, details, isGeo } = useApproveLoanDetails();

  if (isLoadingDetails) {
    return <LoadingInView />;
  }

  if (!details) {
    return <View />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <DetailsItem
        label="approvedLoan.amount"
        value={formatMoney(details?.amount, details?.currency)}
      />
      <DetailsItem label="approvedLoan.annualInterestRate" value={`${details?.interest} %`} />
      <DetailsItem
        label="approvedLoan.effectiveInterestRate"
        value={`${details?.effectiveRate} %`}
      />
      <DetailsItem label="approvedLoan.term" value={formatDate(details?.endDate, SPACED_YEAR)} />
      <DetailsItem
        label="approvedLoan.monthlyContribution"
        value={formatMoney(details?.monthlyPayment + details?.lifeInsurance, details?.currency)}
      />
      <DetailsItem
        label="approvedLoan.issuingCommission"
        value={formatMoney(details?.disbursementFee, details?.currency)}
      />
      <DetailsItem
        label="approvedLoan.prepaymentFee"
        value={isGeo ? details?.prepaymentConditions?.ka : details?.prepaymentConditions?.en}
      />
      <DetailsItem
        label="approvedLoan.validPeriod"
        value={formatDate(details?.offerValidityEndTime)}
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
