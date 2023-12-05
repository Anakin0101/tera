import React, { FC } from 'react';
import { View } from 'react-native';
import { Collapsible, Text } from 'components';
import { formatDateFullMonth } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { ScheduleItemProps } from './LoanScheduleModal.types';
import { useStyles } from './LoanScheduleModal.styles';

export const ScheduleItem: FC<ScheduleItemProps> = ({ item }) => {
  const styles = useStyles();

  const isSchedule = 'totalDebt' in item;

  return (
    <Collapsible
      headerHeight={40}
      contentHeight={90}
      renderHeader={
        <View style={styles.itemHeader}>
          <Text
            children={formatDateFullMonth(
              isSchedule ? item.nextPaymentDay : item.paymentDate,
              !isSchedule ? 'DD/MM/YYYY' : undefined,
            )}
          />
          <Text children={formatMoney(isSchedule ? item.totalDebt : item.total)} />
        </View>
      }
      renderContent={
        <View>
          <Text
            children="loanSchedule.principal"
            translateProp={{ value: formatMoney(item.principal) }}
          />
          <Text
            children="loanSchedule.interest"
            translateProp={{ value: formatMoney(item.interest) }}
          />
          <Text
            children="loanSchedule.commission"
            translateProp={{ value: formatMoney(isSchedule ? item.insurance : item.fee) }}
          />
        </View>
      }
      headerWrapperStyle={styles.headerWrapper}
      iconContainerStyle={styles.iconContainer}
      containerStyle={styles.collapsibleContainer}
    />
  );
};
