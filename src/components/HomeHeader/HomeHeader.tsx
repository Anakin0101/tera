import React, { FC } from 'react';
import { View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import useTheme from 'hooks/useTheme';
import { IconComponent, Text } from '../index';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setScrollToTop } from 'store/slices/dashboard';
import { Chat, Search } from 'assets/SVGs';
import { IBadgeProps, IHomeHeaderProps } from './HomeHeader.types';
import { useStyles } from './HomeHeader.styles';

const Badge: FC<IBadgeProps> = ({ quantity }) => {
  const styles = useStyles();
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeLabel}>{quantity}</Text>
    </View>
  );
};

export const HomeHeader: FC<IHomeHeaderProps> = ({ translateY, zIndex }) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { Colors } = useTheme();

  const onTouch = () => {
    dispatch(setScrollToTop(true));
  };

  const overlayColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateY.value,
      [0, 20],
      [Colors.dashboardBackground, Colors.overlay],
    ),
  }));

  const zIndexHeader = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
  }));

  const zIndexOverlay = useAnimatedStyle(() => ({
    zIndex: zIndex.value / 2,
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, zIndexHeader]} onTouchStart={onTouch}>
        <Animated.View style={styles.innerContainer}>
          <Text children="navigation.hello" style={styles.text} />
          <View style={styles.iconContainer}>
            <IconComponent
              handler={() => {}}
              IconJSX={Search}
              customIconComponentStyles={styles.icon}
            />
            <IconComponent
              handler={() => {}}
              IconJSX={Chat}
              customIconComponentStyles={styles.icon}
            />
          </View>
          <Badge quantity={4} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.overlay, overlayColor, zIndexOverlay]} onTouchStart={onTouch} />
    </View>
  );
};
