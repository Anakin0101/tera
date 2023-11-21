import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '../index';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { DepositType } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './CardsAndAccountsSlider.styles';

interface DepositSliderItemProps {
  item: DepositType;
}

export const DepositSliderItem: FC<DepositSliderItemProps> = ({ item }) => {
  const styles = useStyles();

  return (
    <View style={[styles.card, styles.depositItem]}>
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderWidth: 1,
            borderRadius: 24,
            borderColor: Colors.inputBlack50,
          }}
        />
        <View>
          <Text children={item.depositName} color={Colors.inactiveTint} />
          <Text size={30} medium lineHeight={34}>
            {formatMoney(item.amount)} {CurrencySignMap[item.currency]}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 6,
          borderRadius: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.inputBlack50,
        }}
      >
        <Text children="დარიცხული სარგებელი" label color={Colors.textBlack500} />
        <Text
          medium
          label
          color={Colors.success}
          children={` +${formatMoney(item.totalInterest)} ${CurrencySignMap[item.currency]}`}
        />
      </View>
    </View>
  );
};
