import React, { FC } from 'react';
import { View, Animated } from 'react-native';
import useStyles from './Carousel.styles';
import { IndicatorProps } from './Carousel.types';
import useTheme from 'hooks/useTheme';
import { config } from 'utils/config';

const { mobileWidth } = config;
const SLIDE_WIDTH = mobileWidth - 48;

export const Dots: FC<IndicatorProps> = ({
  data,
  dotStyle,
  translateX,
  activeIndex,
  dotContainerStyle,
}) => {
  const { Colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={[styles.dotContainer, dotContainerStyle]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * SLIDE_WIDTH, i * SLIDE_WIDTH, (i + 1) * SLIDE_WIDTH];

        const scale = translateX.interpolate({
          inputRange,
          outputRange: [1, 2, 1],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              dotStyle,
              {
                transform: [{ scale }],
                backgroundColor: activeIndex === i ? Colors.primary : Colors.dotGray,
              },
            ]}
          />
        );
      })}
    </View>
  );
};
