import React, { FC } from 'react';
import { View } from 'react-native';
import { Collapsible } from 'components';
import { formatDate, getFormattedDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { Header, Overdue, getLoanStatus } from './LoanDetails';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';

import { useStyles } from './LoanDetailsScreen.styles';
import { CreditCardDetailsProps } from './LoanDetailsScreen.types';
import { DD_MM_YYYY_SLASH } from 'constants/DateTemplates';

export const CreditCardDetails: FC<CreditCardDetailsProps> = ({ creditCard }) => {
  const styles = useStyles();

  const totalOverdue =
    creditCard.overduePrincipalAmount +
    creditCard.overduePrincipalPenalty +
    creditCard.overdueInterestAmount +
    creditCard.overdueInterestPenalty;

  return (
    <View>
      <DetailsItem label="loans.agreementNum" value={creditCard.agreementNumber} />
      <DetailsItem label="loans.interestRate" value={`${creditCard.interestRate}%`} />
      <DetailsItem
        label="loans.startDate"
        value={formatDate(creditCard.creditStartDate, ' YYYY')}
      />
      <DetailsItem label="loans.endDate" value={formatDate(creditCard.creditEndDate, ' YYYY')} />
      <DetailsItem
        label="loans.creditLimit"
        value={formatMoney(creditCard.creditLimit, creditCard.currency)}
      />
      <DetailsItem label="loans.billingDay" value={String(creditCard.billingDay)} />
      <DetailsItem label="loans.status" value={getLoanStatus(creditCard.creditStatus)} />
      <DetailsItem label="loans.creditCardStatus" value={getLoanStatus(creditCard.creditStatus)} />
      <DetailsItem
        label="loans.usedAmount"
        value={formatMoney(creditCard.usedPrincipalAmount, creditCard.currency)}
      />
      <DetailsItem
        label="loans.notUsedAmount"
        value={formatMoney(creditCard.notUsedPrincipalAmount, creditCard.currency)}
      />
      <DetailsItem
        label="loans.accruedInterest"
        value={formatMoney(creditCard.accruedInterest, creditCard.currency)}
      />
      <DetailsItem
        label="loans.interestFreeCreditPayable"
        value={formatMoney(creditCard.interestFreeCreditPayable, creditCard.currency)}
      />
      <DetailsItem
        label="loans.minPayable"
        value={formatMoney(creditCard.minPayable, creditCard.currency)}
      />
      <DetailsItem
        label="loans.minPrincipalPayable"
        value={formatMoney(creditCard.minPrincipalPayable, creditCard.currency)}
      />
      <DetailsItem
        label="loans.minInterestPayable"
        value={formatMoney(creditCard.minInterestPayable, creditCard.currency)}
      />
      <DetailsItem
        label="loans.paymentDeadline"
        value={getFormattedDate(creditCard.paymentEndDate, DD_MM_YYYY_SLASH)}
      />
      <DetailsItem
        label="loans.totalPenalty"
        value={formatMoney(creditCard.totalPenalty, creditCard.currency)}
      />
      <Collapsible
        headerHeight={60}
        contentHeight={160}
        renderHeader={
          <Header title="loans.overdueAmount" total={totalOverdue} currency={creditCard.currency} />
        }
        renderContent={
          <Overdue
            overduePrincipalAmount={creditCard.overduePrincipalAmount}
            overduePrincipalPenalty={creditCard.overduePrincipalPenalty}
            overdueInterestAmount={creditCard.overdueInterestAmount}
            overdueInterestPenalty={creditCard.overdueInterestPenalty}
            currency={creditCard.currency}
          />
        }
        containerStyle={styles.collapsibleContent}
      />
    </View>
  );
};
