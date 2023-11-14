import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Text } from '../index';
import { CreditCard, Smartphone, Swap } from 'assets/SVGs';
import { ActionButtonsProps, IButton } from './CardsAndBalance.types';
import useStyles from './CardsAndBalance.styles';

const Button: FC<IButton> = ({ icon, label, onPress }) => {
  const styles = useStyles();
  return (
    <Pressable onPress={onPress} style={styles.actionButton}>
      <View style={styles.actionButtonIconContainer}>{icon}</View>
      <Text children={label} label marginTop={10} />
    </Pressable>
  );
};

export const ActionButtons: FC<ActionButtonsProps> = ({ children, progress, onSpacePress }) => {
  const styles = useStyles();

  const actionButtons = useAnimatedStyle(() => {
    const value = interpolate(progress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP);
    const height = interpolate(progress.value, [0.5, 1], [0, 140], Extrapolation.CLAMP);

    return {
      transform: [{ scale: value }],
      opacity: value,
      height,
    };
  });

  return (
    <Pressable onPress={onSpacePress}>
      <Animated.View style={[actionButtons]}>
        <View style={styles.actionButtonContainer}>
          <Button label="dashboard.transfer" icon={<Swap />} onPress={() => {}} />
          <Button label="dashboard.pay" icon={<CreditCard />} onPress={() => {}} />
          <Button label="dashboard.fill" icon={<Smartphone />} onPress={() => {}} />
        </View>
        {children}
      </Animated.View>
    </Pressable>
  );
};
