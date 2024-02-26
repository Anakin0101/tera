import React, { FC } from 'react';
import { View } from 'react-native';
import { Collapsible, Text } from 'components';
import { formatDateFullMonth } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { ScheduleItemProps } from './LoanScheduleModal.types';
import { useStyles } from './LoanScheduleModal.styles';
import { Colors } from 'theme/Variables';
import { SEPARATED_BY_SLASH } from 'constants/DateTemplates';

export const ScheduleItem: FC<ScheduleItemProps> = ({ item, currency, currentId }) => {
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
              isSchedule ? item?.nextPaymentDay : item?.paymentDate,
              !isSchedule ? SEPARATED_BY_SLASH : undefined,
            )}
            color={isSchedule && item?.id === currentId ? Colors.primary : Colors.textBlack}
            demiBold={isSchedule && item?.id === currentId}
          />
          <Text
            children={formatMoney(isSchedule ? item?.totalDebt : item?.total, currency)}
            color={isSchedule && item?.id === currentId ? Colors.primary : Colors.textBlack}
            demiBold={isSchedule && item?.id === currentId}
          />
        </View>
      }
      renderContent={
        <View>
          <Text
            children="loanSchedule.principal"
            translateProp={{ value: formatMoney(item?.principal, currency) }}
          />
          <Text
            children="loanSchedule.interest"
            translateProp={{ value: formatMoney(item?.interest, currency) }}
          />
          <Text
            children="loanSchedule.commission"
            translateProp={{
              value: formatMoney(isSchedule ? item?.insurance : item?.lifeInsurance, currency),
            }}
          />
        </View>
      }
      headerWrapperStyle={styles.headerWrapper}
      iconContainerStyle={styles.iconContainer}
      containerStyle={styles.collapsibleContainer}
    />
  );
};
