import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '../index';
import { StatusBadgeProps } from './CardsAndAccountsSlider.types';
import { useStyles } from './CardsAndAccountsSlider.styles';
import { Colors } from 'theme/Variables';

export const CardStatusBadge: FC<StatusBadgeProps> = ({ icon, text, textColor = Colors.error }) => {
  const styles = useStyles();
  return (
    <View style={styles.cardStatusBadge}>
      <View>{icon}</View>
      <Text children={text} label color={textColor} />
    </View>
  );
};
