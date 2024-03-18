import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { HeaderProps } from './DepositsAndLoans.types';
import { useStyles } from './DepositsAndLoans.styles';

export const Header: FC<HeaderProps> = memo(({ title, quantity, totalAmount, seeAll }) => {
  const styles = useStyles(seeAll);

  return (
    <View style={styles.header}>
      {!seeAll && (
        <Text
          size={14}
          lineHeight={20}
          color={Colors.textBlack500}
          translateProp={{ value: quantity }}
          children={title}
        />
      )}
      <Text size={30} regular lineHeight={36} marginTop={8}>
        {formatMoney(totalAmount, CurrencyEnum.GEL)}
      </Text>
    </View>
  );
});
