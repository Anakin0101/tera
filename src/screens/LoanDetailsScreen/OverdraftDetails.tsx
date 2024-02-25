import React, { FC } from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { getLoanStatus } from './LoanDetails';
import { OverdraftDetailsProps } from './LoanDetailsScreen.types';

export const OverdraftDetails: FC<OverdraftDetailsProps> = ({ overdraft }) => {
  return (
    <View>
      <DetailsItem label="loans.agreementNum" value={overdraft.agreementNumber} />
      <DetailsItem label="loans.interestRate" value={`${overdraft.interestRate}%`} />
      <DetailsItem label="loans.startDate" value={formatDate(overdraft.startDate, ' YYYY')} />
      <DetailsItem label="loans.endDate" value={formatDate(overdraft.endDate, ' YYYY')} />
      <DetailsItem
        label="loans.accruedInterest"
        value={formatMoney(overdraft.totalInterest, overdraft.currency)}
      />
      <DetailsItem label="loans.iban" value={overdraft.accountIban} />
      <DetailsItem label="loans.status" value={getLoanStatus(overdraft.status)} />
      <DetailsItem
        label="loans.allDebt"
        value={formatMoney(overdraft.totalDebt, overdraft.currency)}
      />
    </View>
  );
};
