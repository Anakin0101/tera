import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { Settings } from 'assets/SVGs';
import { useStyles } from './AllAcountsAndCardsScreen.styles';
import { HeaderRightProps } from './AllAccountsAndCardsScreen.types';

export const HeaderRight: FC<HeaderRightProps> = ({ onPress }) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress} style={styles.iconContainer}>
      <Settings />
    </Pressable>
  );
};
