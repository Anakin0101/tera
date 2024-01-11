import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowProps } from './HeaderBackArrow.types';
import { useStyles } from './HeaderBackArrow.styles';

export const HeaderBackArrow: FC<BackArrowProps> = ({ backImage }) => {
  const { goBack } = useNavigation();
  const styles = useStyles();

  const onGoBack = () => {
    goBack();
  };
  return (
    <Pressable style={styles.wrapper} hitSlop={20} onPress={onGoBack}>
      {backImage}
    </Pressable>
  );
};
