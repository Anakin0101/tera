import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { LoanSliderItemProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { formatDate } from 'utils/formatDate';

export const LoanSliderItem: FC<LoanSliderItemProps> = ({ item }) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer} />
        <View>
          <Text children={item.productName} color={Colors.inactiveTint} />
          <Text size={30} medium lineHeight={34}>
            {formatMoney(item?.amount || 0)} {CurrencySignMap[item.currency]}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text
          label
          children={'loans.nextPayment'}
          translateProp={{ value: formatDate(item?.nextPaymentDate, ' YYYY') }}
          color={Colors.textBlack500}
        />
        <Text
          label
          medium
          color={Colors.error}
          children={`  ${formatMoney(item.nextPaymentAmount || 0)} ${
            CurrencySignMap[item.currency]
          }`}
        />
      </View>
    </View>
  );
};
