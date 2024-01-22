import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { RegistrationMethodCardProps } from './RegistrationMethodCard.types';
import { useStyles } from './RegistrationMethodCard.styles';
import { Text } from 'components/Text/Text';
import { Forward } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const RegistrationMethodCard: FC<RegistrationMethodCardProps> = ({
  description,
  handlePress,
  icon,
  title,
  borderTop,
  borderBottom,
}) => {
  const styles = useStyles();
  return (
    <Pressable
      style={[
        styles.wrapper,
        borderTop && styles.withTopBorder,
        borderBottom && styles.withBottomBorder,
      ]}
      onPress={handlePress}
    >
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.contentContainer}>
          <Text children={title} demiBold />
          <Text children={description} color={Colors.textGray} size={12} />
        </View>
      </View>
      <View style={styles.forwardContainer}>
        <Forward />
      </View>
    </Pressable>
  );
};
