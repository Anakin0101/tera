import React from 'react';
import { View } from 'react-native';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';

export const OverdraftDetails = ({ overdraft }: { overdraft: OverdraftType }) => {
  return (
    <View>
      <DetailsItem label="loans.agreementNum" value={overdraft.agreementNumber} />
      <DetailsItem label="loans.interestRate" value={`${overdraft.interestRate}%`} />
      <DetailsItem label="loans.startDate" value={formatDate(overdraft.startDate, ' YYYY')} />
      <DetailsItem label="loans.endDate" value={formatDate(overdraft.endDate, ' YYYY')} />
      <DetailsItem label="loans.accruedInterest" value={formatMoney(overdraft.totalInterest)} />
      <DetailsItem
        label="loans.allDebt"
        value={formatMoney(overdraft.totalDebt, overdraft.currency)}
      />
    </View>
  );
};
