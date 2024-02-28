import React, { FC, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Collapsible, Text } from 'components';
import { formatDate, getFormattedDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { Header, getLoanStatus } from './LoanDetails';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { CollapsibleItemProps, CreditCardDetailsProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { Colors } from 'theme/Variables';
import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { SEPARATED_BY_SLASH, SPACED_YEAR } from 'constants/DateTemplates';
import { Copy } from 'assets/SVGs';
import { useCopyToClipboard } from 'hooks';
import { AccountTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

const getAccountType = (type: AccountTypeEnum) => {
  switch (type) {
    case AccountTypeEnum.Card:
      return 'loans.cardAcc';
    case AccountTypeEnum.Current:
      return 'loans.current';
    case AccountTypeEnum.Deposit:
      return 'loans.deposit';
  }
};

const CollapsibleItem: FC<CollapsibleItemProps> = ({ label, value, currency }) => {
  const styles = useStyles();

  return (
    <View style={styles.nextPaymentDetails}>
      <Text size={13} children={label} color={Colors.textBlack500} />
      <Text children={formatMoney(value, currency)} />
    </View>
  );
};

export const CreditCardDetails: FC<CreditCardDetailsProps> = ({ creditCard }) => {
  const styles = useStyles();
  const { groupedAccountsByIban } = useGroupedAccountsByIban();
  const { copyToClipboard } = useCopyToClipboard();

  const accNumber = useMemo(() => {
    const acc = groupedAccountsByIban?.find(
      item => item?.accountNumber === creditCard?.accountNumber,
    );
    if (acc) {
      return acc?.iban;
    }
    return creditCard?.accountNumber;
  }, [creditCard?.accountNumber, groupedAccountsByIban]);

  const accType = useMemo(() => {
    const account = groupedAccountsByIban
      ?.flatMap(grouped => grouped?.accounts)
      ?.find(acc => acc?.accountId === creditCard?.accountId);

    if (account) {
      return getAccountType(account?.accountType);
    }
    return '';
  }, [creditCard.accountId, groupedAccountsByIban]);

  const onCopyToClipboardPress = useCallback(() => {
    copyToClipboard(String(accNumber), 'products.clipboard');
  }, [accNumber, copyToClipboard]);

  const totalOverdue = creditCard?.overduePrincipalAmount + creditCard?.overdueInterestAmount;

  const totalPenalty = creditCard?.overduePrincipalPenalty + creditCard?.overdueInterestPenalty;

  return (
    <View>
      <DetailsItem label="loans.accountName" value={creditCard?.productName} />
      <DetailsItem
        label="loans.accNumber"
        value={accNumber}
        icon={<Copy />}
        onPress={onCopyToClipboardPress}
      />
      {accType && <DetailsItem label="loans.accType" value={accType} />}
      <DetailsItem label="loans.ccy" value={creditCard?.currency} />
      <DetailsItem label="loans.agreementNum" value={creditCard?.agreementNumber} />
      <DetailsItem label="loans.interestRate" value={`${creditCard?.interestRate}%`} />
      <DetailsItem
        label="loans.startDate"
        value={formatDate(creditCard?.creditStartDate, SPACED_YEAR)}
      />
      <DetailsItem
        label="loans.endDate"
        value={formatDate(creditCard?.creditEndDate, SPACED_YEAR)}
      />
      <DetailsItem
        label="loans.creditLimit"
        value={formatMoney(creditCard?.creditLimit, creditCard?.currency)}
      />
      <DetailsItem label="loans.billingDay" value={String(creditCard?.billingDay)} />
      <DetailsItem label="loans.status" value={getLoanStatus(creditCard?.creditStatus)} />
      <DetailsItem
        label="loans.creditCardStatus"
        value={creditCard?.creditIsOn ? 'creditStatus.current' : 'creditStatus.expired'}
      />
      <DetailsItem
        label="loans.usedAmount"
        value={formatMoney(creditCard?.usedPrincipalAmount, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.notUsedAmount"
        value={formatMoney(creditCard?.notUsedPrincipalAmount, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.accruedInterest"
        value={formatMoney(creditCard?.accruedInterest, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.interestFreeCreditPayable"
        value={formatMoney(creditCard?.interestFreeCreditPayable, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.minPayable"
        value={formatMoney(creditCard?.minPayable, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.minPrincipalPayable"
        value={formatMoney(creditCard?.minPrincipalPayable, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.minInterestPayable"
        value={formatMoney(creditCard?.minInterestPayable, creditCard?.currency)}
      />
      <DetailsItem
        label="loans.paymentDeadline"
        value={getFormattedDate(creditCard?.paymentEndDate, SEPARATED_BY_SLASH)}
      />
      <DetailsItem
        label="loans.totalPenalty"
        value={formatMoney(creditCard?.totalPenalty, creditCard?.currency)}
      />
      <Collapsible
        headerHeight={60}
        contentHeight={80}
        renderHeader={
          <Header title="loans.totalPenalty" total={totalPenalty} currency={creditCard?.currency} />
        }
        renderContent={
          <View style={styles.overdueWrapper}>
            <CollapsibleItem
              label="loans.overduePrincipalPenalty"
              value={creditCard?.overduePrincipalPenalty}
              currency={creditCard?.currency}
            />
            <CollapsibleItem
              label="loans.overdueInterestPenalty"
              value={creditCard?.overdueInterestPenalty}
              currency={creditCard?.currency}
            />
          </View>
        }
        containerStyle={styles.collapsibleContent}
      />
      <Collapsible
        headerHeight={60}
        contentHeight={80}
        renderHeader={
          <Header
            title="loans.overdueAmount"
            total={totalOverdue}
            currency={creditCard?.currency}
          />
        }
        renderContent={
          <View style={styles.overdueWrapper}>
            <CollapsibleItem
              label="loans.overduePrincipalAmount"
              value={creditCard?.overduePrincipalAmount}
              currency={creditCard?.currency}
            />
            <CollapsibleItem
              label="loans.overdueInterestAmount"
              value={creditCard?.overdueInterestAmount}
              currency={creditCard?.currency}
            />
          </View>
        }
        containerStyle={styles.collapsibleContent}
      />
    </View>
  );
};
