import React, { FC, useCallback } from 'react';
import { Pressable } from 'react-native';
import { ArrowHeader } from 'assets/SVGs/ArrowHeader';
import { useNavigation } from '@react-navigation/native';
import { BackArrowProps } from './HeaderBackArrow.types';
import { useStyles } from './HeaderBackArrow.styles';

export const HeaderBackArrow: FC<BackArrowProps> = ({ onPress, style = {} }) => {
  const { goBack } = useNavigation();
  const styles = useStyles();

  const onGoBack = useCallback(() => {
    if (onPress) {
      onPress();
    } else {
      goBack();
    }
  }, [goBack, onPress]);

  return (
    <Pressable style={[styles.wrapper, style]} hitSlop={20} onPress={onGoBack}>
      <ArrowHeader />
    </Pressable>
  );
};
