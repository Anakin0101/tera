import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { DepositSliderItemProps } from './DepositDetailsScreen.types';
import { useStyles } from './DepositDetailsScreen.styles';

export const DepositSliderItem: FC<DepositSliderItemProps> = ({ item }) => {
  const styles = useStyles();

  return (
    <View style={[styles.card, styles.depositItem]}>
      <View style={styles.header}>
        <View style={styles.iconContainer} />
        <View>
          <Text children={item.depositName} color={Colors.inactiveTint} />
          <Text size={30} medium lineHeight={34}>
            {formatMoney(item.amount)} {CurrencySignMap[item.currency]}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text children={'deposits.accruedBenefit'} label color={Colors.textBlack500} />
        <Text
          label
          medium
          color={Colors.success}
          children={` +${formatMoney(item.totalInterest)} ${CurrencySignMap[item.currency]}`}
        />
      </View>
    </View>
  );
};
