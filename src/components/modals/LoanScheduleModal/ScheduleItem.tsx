import React, { FC } from 'react';
import { View } from 'react-native';
import { Collapsible, Text } from 'components';
import { formatDateFullMonth } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { ScheduleItemProps } from './LoanScheduleModal.types';
import { useStyles } from './LoanScheduleModal.styles';
import { getCurrencyIcon } from 'utils/currency';

export const ScheduleItem: FC<ScheduleItemProps> = ({ item, currency }) => {
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
          <View style={styles.amountView}>
            <Text
              style={styles.amount}
              children={formatMoney(isSchedule ? item.totalDebt : item.total)}
            />
            <Text>{getCurrencyIcon(currency)}</Text>
          </View>
        </View>
      }
      renderContent={
        <View>
          <View style={styles.amountView}>
            <Text
              style={styles.amount}
              children="loanSchedule.principal"
              translateProp={{ value: formatMoney(item.principal) }}
            />
            <Text>{getCurrencyIcon(currency)}</Text>
          </View>
          <View style={styles.amountView}>
            <Text
              style={styles.amount}
              children="loanSchedule.interest"
              translateProp={{ value: formatMoney(item.interest) }}
            />
            <Text>{getCurrencyIcon(currency)}</Text>
          </View>

          <View style={styles.amountView}>
            <Text
              style={styles.amount}
              children="loanSchedule.commission"
              translateProp={{ value: formatMoney(isSchedule ? item.insurance : item.fee) }}
            />
            <Text>{getCurrencyIcon(currency)}</Text>
          </View>
        </View>
      }
      headerWrapperStyle={styles.headerWrapper}
      iconContainerStyle={styles.iconContainer}
      containerStyle={styles.collapsibleContainer}
    />
  );
};
