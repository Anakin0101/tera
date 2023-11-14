import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Text } from 'components';
import { useTheme } from 'hooks';
import { formatMoney } from 'utils/formatMoney';
import { Dots, Eye, EyeSlash, Tera } from 'assets/SVGs';
import { AvailableBalanceProps } from './CardsAndBalance.types';
import useStyles from './CardsAndBalance.styles';

const Balance = 1024850;
const Terabytes = 24;

const AvailableBalance: FC<AvailableBalanceProps> = ({ progress }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const balanceScale = useSharedValue(0);

  const balanceStyle = useAnimatedStyle(() => {
    const opacity = interpolate(balanceScale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const dotsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(balanceScale.value, [0, 1], [0, 1]);
    return {
      opacity,
    };
  });

  const animStyleBalance = useAnimatedStyle(() => {
    const marginLeft = interpolate(progress.value, [0, 1], [0, -250]);
    const value = interpolate(progress.value, [0, 1], [1, 0]);

    return {
      marginLeft,
      opacity: value,
      transform: [{ scale: value }],
    };
  });

  const onPressHandler = () => {
    balanceScale.value
      ? (balanceScale.value = withTiming(0))
      : (balanceScale.value = withTiming(1));
  };

  return (
    <Animated.View style={[styles.balanceContainer, animStyleBalance]}>
      <View style={styles.availableBalance}>
        <Text children="dashboard.availableBalance" size={14} color={Colors.inactiveTint} />
        <Pressable onPress={onPressHandler}>
          <Animated.View style={[styles.iconContainer, dotsStyle]}>
            <Eye />
          </Animated.View>
          <Animated.View style={[styles.iconContainer, styles.closeEye, balanceStyle]}>
            <EyeSlash />
          </Animated.View>
        </Pressable>
      </View>
      <Animated.View style={[styles.balance, balanceStyle]}>
        <Text size={28} lineHeight={36}>
          ₾{formatMoney(Balance)}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.dots, dotsStyle]}>
        <Dots />
      </Animated.View>
      <Pressable onPress={() => {}}>
        <View style={styles.terabytes}>
          <Tera />
          <Text children="dashboard.terabytes" translateProp={{ value: Terabytes }} label special />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default AvailableBalance;
