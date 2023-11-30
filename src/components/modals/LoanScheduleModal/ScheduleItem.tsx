import React, { FC } from 'react';
import { View } from 'react-native';
import { Collapsible, Text } from 'components';
import { formatDateFullMonth } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { ScheduleItemProps } from './LoanScheduleModal.types';
import { useStyles } from './LoanScheduleModal.styles';

export const ScheduleItem: FC<ScheduleItemProps> = ({ item }) => {
  const styles = useStyles();

  return (
    <Collapsible
      headerHeight={40}
      contentHeight={90}
      renderHeader={
        <View style={styles.itemHeader}>
          <Text children={formatDateFullMonth(item.nextPaymentDay)} />
          <Text children={formatMoney(item.totalDebt)} />
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
            translateProp={{ value: formatMoney(item.insurance) }}
          />
        </View>
      }
      headerWrapperStyle={styles.headerWrapper}
      iconContainerStyle={styles.iconContainer}
      containerStyle={styles.collapsibleContainer}
    />
  );
};
