import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolate,
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Colors } from 'theme/Variables';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { ItemProps } from './NewDepositAdditionalInfoScreen.types';
import { useStyles } from './NewDepositAdditionalInfoScreen.styles';
import { CIRCULAR_ITEM_SIZE } from 'constants/common';

export const Item: FC<ItemProps> = memo(({ item, index, scrollX, onPress, currency }) => {
  const styles = useStyles();

  const animStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * CIRCULAR_ITEM_SIZE,
      index * CIRCULAR_ITEM_SIZE,
      (index + 1) * CIRCULAR_ITEM_SIZE,
    ];

    const scale = interpolate(
      scrollX.value,
      [
        (index - 2) * CIRCULAR_ITEM_SIZE,
        (index - 1) * CIRCULAR_ITEM_SIZE,
        index * CIRCULAR_ITEM_SIZE,
        (index + 1) * CIRCULAR_ITEM_SIZE,
        (index + 2) * CIRCULAR_ITEM_SIZE,
      ],
      [0.7, 0.8, 1, 0.8, 0.7],
    );

    const borderColor = interpolateColor(scrollX.value, inputRange, [
      Colors.secondary,
      Colors.primary,
      Colors.secondary,
    ]);

    const borderWidth = interpolate(scrollX.value, inputRange, [1, 2, 1], Extrapolation.CLAMP);

    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      'transparent',
      Colors.secondary,
      'transparent',
    ]);

    return {
      transform: [{ scale }],
      borderColor,
      borderWidth,
      backgroundColor,
    };
  });

  const textAnimStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollX.value,
      [
        (index - 2) * CIRCULAR_ITEM_SIZE,
        (index - 1) * CIRCULAR_ITEM_SIZE,
        index * CIRCULAR_ITEM_SIZE,
        (index + 1) * CIRCULAR_ITEM_SIZE,
        (index + 2) * CIRCULAR_ITEM_SIZE,
      ],
      [Colors.textBlack500, Colors.black700, Colors.primary, Colors.black700, Colors.textBlack500],
    );

    return {
      color,
    };
  });

  return (
    <Pressable onPress={() => onPress(index)}>
      <Animated.View style={styles.itemWrapper}>
        <Animated.View style={[styles.itemContainer, animStyle]}>
          <Animated.Text style={[styles.itemText, textAnimStyle]}>
            {currency ? `${item} ${CurrencySignMap[currency]}` : item}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});
