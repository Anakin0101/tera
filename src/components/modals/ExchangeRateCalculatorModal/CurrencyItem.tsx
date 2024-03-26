import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';
import { Text } from 'components';
import { useStyles } from './ExchangeRateCalculatorModal.styles';
import { CurrencyItemProps } from './ExchangeRateCalculatorModal.types';

export const CurrencyItem: FC<CurrencyItemProps> = memo(({ item, setCurrency, currency }) => {
  const styles = useStyles();

  const handlePress = () => {
    setCurrency(item);
  };

  return (
    <Pressable
      key={item}
      onPress={handlePress}
      style={[styles.cur, item === currency && styles.selected]}
    >
      <Text children={item} />
    </Pressable>
  );
});
