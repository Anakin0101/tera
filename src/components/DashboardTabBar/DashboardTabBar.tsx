import { LayoutChangeEvent } from 'react-native';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { ITabBarProps } from './DashboardTabBar.types';
import { config } from 'utils/config';
import { TabBarLabel } from '../index';
import { useStyles } from './DashboardTabBar.styles';
import { Colors } from 'theme/Variables';

export const DISTANCE_BETWEEN_TABS = 25;

export const DashboardTabBar: FC<ITabBarProps> = ({
  zIndex,
  translateX,
  translateY,
  onTabPress,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [firstTabWidth, setFirstTabWidth] = useState(0);
  const [secondTabWidth, setSecondTabWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent, idx: number) => {
    const { width } = event.nativeEvent.layout;
    idx === 0 ? setFirstTabWidth(width) : setSecondTabWidth(width);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [0, config.mobileWidth],
          [24, 24 + firstTabWidth + DISTANCE_BETWEEN_TABS + (secondTabWidth - firstTabWidth) / 2],
        ),
      },
      {
        scaleX: interpolate(
          translateX.value,
          [0, config.mobileWidth],
          [1, secondTabWidth / firstTabWidth],
        ),
      },
    ],
  }));

  const zIdx = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
    };
  });

  const color = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateY.value,
        [0, 20],
        [Colors.dashboardBackground, Colors.overlay],
      ),
    };
  });

  return (
    <>
      <Animated.View style={[styles.tabBarContainer, zIdx]}>
        <TabBarLabel
          index={0}
          tab={t('dashboard.tera')}
          onLayout={onLayout}
          onTabPress={onTabPress}
          translateX={translateX}
        />
        <TabBarLabel
          index={1}
          tab={t('dashboard.otherBanks')}
          onLayout={onLayout}
          onTabPress={onTabPress}
          translateX={translateX}
        />
        <Animated.View
          style={[
            styles.indicator,
            { width: firstTabWidth },
            firstTabWidth && secondTabWidth ? animatedStyle : {},
          ]}
        />
      </Animated.View>
      <Animated.View style={[styles.overlay, color]} />
    </>
  );
};
