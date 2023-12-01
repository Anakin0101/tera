import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CollapsibleProps } from './Collapsible.types';
import { useStyles } from './Collapsible.styles';
import { ChevronDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const Collapsible: FC<CollapsibleProps> = ({
  renderHeader,
  renderContent,
  containerStyle,
  headerWrapperStyle,
  headerContainerStyle,
  contentContainerStyle,
  iconContainerStyle,
  iconColor = Colors.black700,
  headerHeight,
  contentHeight,
}) => {
  const styles = useStyles();
  const height = useSharedValue(headerHeight);

  const onPress = () => {
    if (height.value > headerHeight) {
      height.value = withTiming(headerHeight);
    } else {
      height.value = withTiming(headerHeight + contentHeight);
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const animatedIconContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          height.value,
          [headerHeight, headerHeight + contentHeight],
          [0, 180],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ],
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, containerStyle, animatedContainerStyle]}>
        <View style={[styles.headerWrapper, headerWrapperStyle]}>
          <View style={[styles.headerContainer, headerContainerStyle]}>{renderHeader}</View>
          <Animated.View style={[iconContainerStyle, animatedIconContainerStyle]}>
            <ChevronDown color={iconColor} />
          </Animated.View>
        </View>
        <View style={contentContainerStyle}>{renderContent}</View>
      </Animated.View>
    </Pressable>
  );
};
