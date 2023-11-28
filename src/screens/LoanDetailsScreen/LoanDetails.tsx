import React, { FC } from 'react';
import { View } from 'react-native';
import { Colors } from 'theme/Variables';
import { formatDate } from 'utils/formatDate';
import { Collapsible, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import {
  LoanDetailsProps,
  OverdueContentProps,
  TotalDebtContentProps,
  CollapsibleHeaderProps,
} from './LoanDetailsScreen.types';
import { CreditStatus } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { useStyles } from './LoanDetailsScreen.styles';

const getLoanStatus = (status: CreditStatus) => {
  switch (status) {
    case CreditStatus.Current:
      return 'creditStatus.current';
    case CreditStatus.Late:
      return 'creditStatus.late';
    case CreditStatus.Overdue:
      return 'creditStatus.overdue';
    case CreditStatus.WrittenOff:
      return 'creditStatus.writtenOff';
    case CreditStatus.Closed:
      return 'creditStatus.closed';
  }
};

const Header: FC<CollapsibleHeaderProps> = ({ title, total, currency }) => {
  const styles = useStyles();
  return (
    <View style={styles.collapsibleHeaderWrapper}>
      <View style={styles.collapsibleHeader}>
        <Text children={title} />
        <Text children={formatMoney(total, currency)} />
      </View>
    </View>
  );
};

const TotalDebtContent: FC<TotalDebtContentProps> = ({
  totalPrincipalPayable,
  totalInterestPayable,
  totalPenalty,
  currency,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.totalDebtWrapper}>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.totalPrincipalPayable" color={Colors.textBlack500} />
        <Text children={formatMoney(totalPrincipalPayable, currency)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.interest" color={Colors.textBlack500} />
        <Text children={formatMoney(totalInterestPayable, currency)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.totalPenalty" color={Colors.textBlack500} />
        <Text children={formatMoney(totalPenalty, currency)} />
      </View>
    </View>
  );
};

const Overdue: FC<OverdueContentProps> = ({
  overduePrincipalAmount,
  overduePrincipalPenalty,
  overdueInterestAmount,
  overdueInterestPenalty,
  defferdPrincipalAmount,
  currency,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.overdueWrapper}>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.overduePrincipalAmount" color={Colors.textBlack500} />
        <Text children={formatMoney(overduePrincipalAmount, currency)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.overduePrincipalPenalty" color={Colors.textBlack500} />
        <Text children={formatMoney(overduePrincipalPenalty, currency)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.overdueInterestAmount" color={Colors.textBlack500} />
        <Text children={formatMoney(overdueInterestAmount, currency)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.overdueInterestPenalty" color={Colors.textBlack500} />
        <Text children={formatMoney(overdueInterestPenalty, currency)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.defferdPrincipalAmount" color={Colors.textBlack500} />
        <Text children={formatMoney(defferdPrincipalAmount, currency)} />
      </View>
    </View>
  );
};

export const LoanDetails: FC<LoanDetailsProps> = ({ loan }) => {
  const styles = useStyles();

  const totalOverdue =
    loan.overduePrincipalAmount +
    loan.overduePrincipalPenalty +
    loan.overdueInterestAmount +
    loan.overdueInterestPenalty +
    loan.defferdPrincipalAmount;

  return (
    <View>
      <DetailsItem label="loans.agreementNum" value={loan.agreementNumber} />
      <DetailsItem label="loans.type" value={loan.productName} />
      <DetailsItem label="loans.interestRate" value={`${loan.interestRate}%`} />
      <DetailsItem
        label="loans.period"
        value="loans.creditPeriod"
        translateProp={{ value: loan.creditPeriodInMonths }}
      />
      <DetailsItem label="loans.restCreditPeriod" value={String(loan.restCreditPeriodInMonths)} />
      <DetailsItem label="loans.startDate" value={formatDate(loan.startDate, ' YYYY')} />
      <DetailsItem label="loans.endDate" value={formatDate(loan.endDate, ' YYYY')} />
      <DetailsItem label="loans.status" value={getLoanStatus(loan.creditStatus)} />
      <DetailsItem
        label="loans.usedAmount"
        value={formatMoney(loan.usedPrincipalAmount, loan.currency)}
      />
      <DetailsItem
        label="loans.notUsedAmount"
        value={formatMoney(loan.notUsedPrincipalAmount, loan.currency)}
      />
      <DetailsItem
        label="loans.accruedInterest"
        value={formatMoney(loan.accruedInterest, loan.currency)}
      />
      <DetailsItem
        label="loans.totalPayable"
        value={formatMoney(loan.totalPayable, loan.currency)}
      />
      <DetailsItem
        label="loans.totalPrincipalPayable"
        value={formatMoney(loan.totalPrincipalPayable, loan.currency)}
      />
      <Collapsible
        headerHeight={60}
        contentHeight={110}
        renderHeader={
          <Header title="loans.totalDebt" total={loan.totalDebt} currency={loan.currency} />
        }
        renderContent={
          <TotalDebtContent
            totalPrincipalPayable={loan.totalPrincipalPayable}
            totalInterestPayable={loan.totalInterestPayable}
            totalPenalty={loan.totalPenalty}
            currency={loan.currency}
          />
        }
        containerStyle={styles.collapsibleContent}
      />
      <Collapsible
        headerHeight={60}
        contentHeight={160}
        renderHeader={
          <Header title="loans.overdueAmount" total={totalOverdue} currency={loan.currency} />
        }
        renderContent={
          <Overdue
            overduePrincipalAmount={loan.overduePrincipalAmount}
            overduePrincipalPenalty={loan.overduePrincipalPenalty}
            overdueInterestAmount={loan.overdueInterestAmount}
            overdueInterestPenalty={loan.overdueInterestPenalty}
            defferdPrincipalAmount={loan.defferdPrincipalAmount}
            currency={loan.currency}
          />
        }
        containerStyle={styles.collapsibleContent}
      />
    </View>
  );
};
