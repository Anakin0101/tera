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
  tabBarLabelStyle,
  activeTab = -1,
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
      [0, 1].map(i => (i === index ? Colors.primary : Colors.textBlack500)),
    ),
  }));

  const OtherBanksOpacity = useAnimatedStyle(() => {
    const tabColor =
      index === translateX.value / config.mobileWidth ? Colors.primary : Colors.textBlack500;

    return {
      opacity: 0.9,
      color: tabColor,
    };
  });

  const handlePress = () => {
    onTabPress(index);
  };

  return (
    <Pressable
      onPress={handlePress}
      key={index}
      style={[
        tabBarLabelStyle ? styles.otherBanksStyle : null,
        tabBarLabelStyle && activeTab === index
          ? { backgroundColor: 'rgba(160, 34, 109, 0.1)', borderColor: '#A0226D' }
          : null,
      ]}
    >
      <Animated.Text
        onLayout={e => onLayout(e, index)}
        children={tab}
        style={
          tabBarLabelStyle ? [styles.sectionList, OtherBanksOpacity] : [styles.sectionList, opacity]
        }
      />
    </Pressable>
  );
};
