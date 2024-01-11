import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Colors } from 'theme/Variables';
import { Text } from 'components';
import { buttonProps } from './FixedButton.types';
import { useStyles } from './FixedButton.styles';

export const FixedButton: FC<buttonProps> = ({ icon, label }) => {
  const styles = useStyles();
  return (
    <>
      <Pressable style={styles.button}>
        <View style={styles.icon}>{icon}</View>
        <Text label children={label} color={Colors.black700} />
      </Pressable>
    </>
  );
};
