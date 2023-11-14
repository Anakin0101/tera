import React, { FC } from 'react';
import { Pressable } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { config } from 'utils/config';
import { Colors } from 'theme/Variables';
import { ITabBarLabelProps } from './TabBarLabel.types';
import { useStyles } from './TabBarLabel.styles';

export const TabBarLabel: FC<ITabBarLabelProps> = ({
  onTabPress,
  index,
  onLayout,
  tab,
  translateX,
}) => {
  const styles = useStyles();

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, config.mobileWidth],
      [0, 1].map(i => (i === index ? 1 : 0.9)),
    ),
    color: interpolateColor(
      translateX.value,
      [0, config.mobileWidth],
      [0, 1].map(i => (i === index ? Colors.primary : Colors.textBlack400)),
    ),
  }));

  return (
    <Pressable onPress={() => onTabPress(index)} key={index}>
      <Animated.Text
        onLayout={e => onLayout(e, index)}
        children={tab}
        style={[styles.sectionList, opacity]}
      />
    </Pressable>
  );
};
