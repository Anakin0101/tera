import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { getLoanStatus } from './LoanDetails';
import { OverdraftDetailsProps } from './LoanDetailsScreen.types';
import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { SPACED_YEAR } from 'constants/DateTemplates';

export const OverdraftDetails: FC<OverdraftDetailsProps> = ({ overdraft }) => {
  const { groupedAccountsByIban } = useGroupedAccountsByIban();

  const accName = useMemo(() => {
    const acc = groupedAccountsByIban?.find(item => item?.iban === overdraft?.accountIban);
    if (acc) {
      return acc?.accountName;
    }
    return '';
  }, [groupedAccountsByIban, overdraft?.accountIban]);

  return (
    <View>
      {accName && <DetailsItem label="loans.accountName" value={accName} />}
      <DetailsItem label="loans.agreementNum" value={overdraft?.agreementNumber} />
      <DetailsItem label="loans.interestRate" value={`${overdraft?.interestRate}%`} />
      <DetailsItem label="loans.startDate" value={formatDate(overdraft?.startDate, SPACED_YEAR)} />
      <DetailsItem label="loans.endDate" value={formatDate(overdraft?.endDate, SPACED_YEAR)} />
      <DetailsItem
        label="loans.accruedInterest"
        value={formatMoney(overdraft?.totalInterest, overdraft?.currency)}
      />
      <DetailsItem label="loans.iban" value={overdraft?.accountIban} />
      <DetailsItem label="loans.accType" value="loans.cardAcc" />
      <DetailsItem label="loans.ccy" value={overdraft?.currency} />
      <DetailsItem label="loans.status" value={getLoanStatus(overdraft?.status)} />
      <DetailsItem
        label="loans.allDebt"
        value={formatMoney(overdraft?.totalDebt, overdraft?.currency)}
      />
    </View>
  );
};
