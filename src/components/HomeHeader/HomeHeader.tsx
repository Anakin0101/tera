import React, { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
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

type Props = {
  translateY: SharedValue<number>;
  close: () => void;
};

const BackDrop = ({ translateY, close }: Props) => {
  const styles = useStyles();
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 230], [0, 0.8]);
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={close}>
      <Animated.View style={[styles.backdrop, backDropAnimation]} />
    </TouchableWithoutFeedback>
  );
};

export const HomeHeader: FC<IHomeHeaderProps> = ({ translateY }) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const onTouch = () => {
    dispatch(setScrollToTop(true));
  };

  const zIndexHeader = useAnimatedStyle(() => ({
    zIndex: translateY.value !== 0 ? 0 : 1,
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
      <BackDrop translateY={translateY} close={onTouch} />
    </View>
  );
};
