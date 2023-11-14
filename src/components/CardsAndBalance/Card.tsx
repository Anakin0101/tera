import React from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import {
  CLOSE_CARD_HEIGHT,
  CLOSE_CARD_WIDTH,
  OPEN_CARD_HEIGHT,
  OPEN_CARD_WIDTH,
} from 'constants/Dashboard';
import { TeraLogo } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { CardProps } from './CardsAndBalance.types';
import useStyles from './CardsAndBalance.styles';

// temp
const BALANCE = 48292.48;

export const Card = ({ item, index, onCardPress, progress }: CardProps) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const animScale = useAnimatedStyle(() => {
    const height = interpolate(
      progress.value,
      [0, 1],
      [CLOSE_CARD_HEIGHT, OPEN_CARD_HEIGHT],
      Extrapolation.CLAMP,
    );
    const width = interpolate(
      progress.value,
      [0, 1],
      [CLOSE_CARD_WIDTH, OPEN_CARD_WIDTH],
      Extrapolation.CLAMP,
    );
    const padding = interpolate(progress.value, [0, 1], [20, 24], Extrapolation.CLAMP);

    return {
      height,
      width,
      padding,
    };
  });

  const firstCardPos = useAnimatedStyle(() => {
    const left = interpolate(progress.value, [0, 1], [70, 0], Extrapolation.CLAMP);
    return {
      left,
    };
  });

  const secondCardPos = useAnimatedStyle(() => {
    const left = interpolate(progress.value, [0, 1], [-101, 0], Extrapolation.CLAMP);
    return {
      left,
    };
  });

  const logoContainer = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [0, 40], Extrapolation.CLAMP);

    return {
      height: size,
      width: size,
    };
  });

  const titleTextSize = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [10, 14], Extrapolation.CLAMP);
    const marginTop = interpolate(progress.value, [0, 1], [0, 5], Extrapolation.CLAMP);

    return {
      fontSize: size,
      marginTop,
    };
  });

  const balance = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [16, 30], Extrapolation.CLAMP);
    const marginTop = interpolate(progress.value, [0, 1], [17, 0], Extrapolation.CLAMP);
    const opacity = interpolate(progress.value, [0, 1], [0.6, 1], Extrapolation.CLAMP);

    return {
      fontSize,
      marginTop,
      opacity,
    };
  });

  const currencyContainer = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [20, 32], Extrapolation.CLAMP);
    const marginTop = interpolate(progress.value, [0, 1], [15, 40], Extrapolation.CLAMP);

    return {
      height: size,
      width: size,
      marginTop,
    };
  });

  const currency = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [10, 16], Extrapolation.CLAMP);

    return {
      fontSize,
    };
  });

  if (!index) {
    return <Animated.View style={[styles.card, animScale]} />;
  }

  return (
    <Pressable onPress={onCardPress}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: item.color },
          index === 1 && firstCardPos,
          index === 2 && secondCardPos,
          animScale,
        ]}
      >
        <View style={styles.cardHeader}>
          <Animated.Text style={[styles.text, titleTextSize]}>
            {t('dashboard.account')}
          </Animated.Text>
          <Animated.View style={logoContainer}>
            <TeraLogo />
          </Animated.View>
        </View>
        <Animated.Text style={[styles.amount, balance]}>{formatMoney(BALANCE)}₾</Animated.Text>
        <View style={styles.currencyWrapper}>
          <Animated.View style={[styles.currencyContainer, currencyContainer]}>
            <Animated.Text style={[styles.currency, currency]}>$</Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.currencyContainer, currencyContainer]}>
            <Animated.Text style={[styles.currency, currency]}>€</Animated.Text>
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
};
