import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { LoanSliderItemProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { SPACED_YEAR } from 'constants/DateTemplates';

export const LoanSliderItem: FC<LoanSliderItemProps> = ({ item }) => {
  const styles = useStyles();

  const isOverdraft = 'overdraftLimit' in item;

  const isCreditCard = 'creditLimit' in item;

  return (
    <View style={styles.card}>
      <View style={[styles.titleContainer, (isOverdraft || isCreditCard) && styles.fill]}>
        <Text numberOfLines={2} children={item.productName} color={Colors.inactiveTint} />
        <Text size={30} medium lineHeight={36}>
          {formatMoney(
            isOverdraft
              ? item?.overdraftLimit - item?.usedPrincipalAmount
              : isCreditCard
              ? item?.creditLimit
              : item?.amount,
            item?.currency,
          )}
        </Text>
      </View>
      {!isCreditCard && !isOverdraft && (
        <View style={styles.footer}>
          <Text
            label
            children={'loans.nextPayment'}
            translateProp={{ value: formatDate(item?.nextPaymentDate, SPACED_YEAR) }}
            color={Colors.textBlack500}
          />
          <Text
            label
            medium
            color={Colors.error}
            children={formatMoney(item?.nextPaymentAmount || 0, item?.currency)}
          />
        </View>
      )}
    </View>
  );
};
