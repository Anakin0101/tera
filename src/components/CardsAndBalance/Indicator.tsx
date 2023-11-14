import React, { FC } from 'react';
import { View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { DotProps, IndicatorProps } from './CardsAndBalance.types';
import useStyles from './CardsAndBalance.styles';
import { config } from 'utils/config';

const CARD_WIDTH = config.mobileWidth - 48;

const Dot = ({ index, translateX }: DotProps) => {
  const styles = useStyles();

  const reanimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [0.6, 1, 0.6],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      translateX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [1, 2, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });
  return <Animated.View key={index} style={[styles.dot, reanimatedStyle]} />;
};

const Indicator: FC<IndicatorProps> = ({ data = [], translateX, hideFirst = true }) => {
  const styles = useStyles();

  return (
    <View style={styles.dotContainer}>
      {data.map((_, i) => {
        if (i === 0 && hideFirst) {
          return;
        }
        return <Dot key={i} index={i} translateX={translateX} />;
      })}
    </View>
  );
};

export default Indicator;
