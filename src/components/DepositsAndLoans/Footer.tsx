import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';
import { Text } from '../index';
import { FooterProps } from './DepositsAndLoans.types';
import { useStyles } from './DepositsAndLoans.styles';

export const Footer: FC<FooterProps> = memo(({ onPress }) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress} style={styles.seeAll}>
      <Text children="transfers.all" special size={14} lineHeight={20} />
    </Pressable>
  );
});
