import React, { FC } from 'react';
import { View } from 'react-native';
import { Colors } from 'theme/Variables';
import { Text } from 'components';
import { BadgeProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';

const Badge: FC<BadgeProps> = ({ icon, label }) => {
  const styles = useStyles();
  return (
    <View style={styles.badge}>
      <View>{icon}</View>
      <Text label children={label} color={Colors.error} />
    </View>
  );
};

export default Badge;
