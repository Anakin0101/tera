import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { ArrowHeader } from 'assets/SVGs/ArrowHeader';
import { useNavigation } from '@react-navigation/native';
import { BackArrowProps } from './HeaderBackArrow.types';
import { useStyles } from './HeaderBackArrow.styles';

export const HeaderBackArrow: FC<BackArrowProps> = () => {
  const { goBack } = useNavigation();
  const styles = useStyles();

  const onGoBack = () => {
    goBack();
  };
  return (
    <Pressable style={styles.wrapper} hitSlop={20} onPress={onGoBack}>
      <ArrowHeader />
    </Pressable>
  );
};
