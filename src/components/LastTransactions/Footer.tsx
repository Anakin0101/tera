import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';
import { Text } from '../index';
import { FooterProps } from './LastTransaction.types';
import { useStyles } from './LastTransactions.styles';

export const Footer: FC<FooterProps> = memo(({ onPress, showFooter }) => {
  const styles = useStyles();

  if (!showFooter) {
    return <></>;
  }

  return (
    <Pressable style={styles.seeAll} onPress={onPress}>
      <Text children="transfers.all" special size={14} lineHeight={20} />
    </Pressable>
  );
});
