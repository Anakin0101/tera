import React, { useCallback, useMemo, useState } from 'react';
import { ImageBackground, Pressable } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import {
  CLOSE_CARD_HEIGHT,
  CLOSE_CARD_WIDTH,
  OPEN_CARD_HEIGHT,
  OPEN_CARD_WIDTH,
} from 'constants/index';
import { formatMoney } from 'utils/formatMoney';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { CardProps } from './CardsAndBalance.types';
import useStyles from './CardsAndBalance.styles';

const DEFAULT_CARD = require('assets/images/DefaultCard.png');

export const Card = ({ item, index, onCardPress, progress }: CardProps) => {
  const styles = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

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

    return {
      height,
      width,
    };
  });

  const firstCardPos = useAnimatedStyle(() => {
    const left = interpolate(progress.value, [0, 1], [65, 0], Extrapolation.CLAMP);
    return { left };
  });

  const secondCardPos = useAnimatedStyle(() => {
    const left = interpolate(progress.value, [0, 1], [-110, 0], Extrapolation.CLAMP);
    return { left };
  });

  const cardHeader = useAnimatedStyle(() => {
    const marginTop = interpolate(progress.value, [0, 1], [15, 30], Extrapolation.CLAMP);
    return { marginTop };
  });

  const titleTextSize = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [10, 14], Extrapolation.CLAMP);
    return { fontSize };
  });

  const balance = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [16, 30], Extrapolation.CLAMP);
    return { fontSize };
  });

  const currencyWrapper = useAnimatedStyle(() => {
    const marginLeft = interpolate(progress.value, [0, 1], [15, 25], Extrapolation.CLAMP);
    const marginTop = interpolate(progress.value, [0, 1], [25, 50], Extrapolation.CLAMP);

    return {
      marginLeft,
      marginTop,
    };
  });

  const currencyContainer = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [20, 32], Extrapolation.CLAMP);

    return {
      height: size,
      width: size,
    };
  });

  const currency = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [10, 16], Extrapolation.CLAMP);
    return { fontSize };
  });

  const imageId = useMemo(() => {
    const accWithCards = item?.accounts?.find(acc => !!acc?.cards?.length);
    if (accWithCards) {
      return accWithCards?.cards?.[0]?.cardLargeImageId;
    }
    return '';
  }, [item.accounts]);

  const getCurrencies = useCallback(() => {
    return item?.accounts?.map((account, idx) => (
      <Pressable onPress={() => setCurrentIndex(idx)} key={idx}>
        <Animated.View style={[styles.currencyContainer, currencyContainer]}>
          <Animated.Text style={[styles.currency, currency]}>
            {CurrencySignMap[account?.ccy]}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    ));
  }, [currency, currencyContainer, item?.accounts, styles.currency, styles.currencyContainer]);

  if (!index) {
    return <Animated.View style={[styles.card, animScale]} />;
  }

  return (
    <Pressable onPress={onCardPress}>
      <Animated.View
        style={[styles.card, index === 1 && firstCardPos, index === 2 && secondCardPos, animScale]}
      >
        <ImageBackground
          source={imageId ? { uri: `${PUBLIC_IMAGE_URL}${imageId}` } : DEFAULT_CARD}
          style={styles.image}
          resizeMode="contain"
        >
          <Animated.View style={[styles.cardHeader, cardHeader]}>
            <Animated.Text style={[styles.text, titleTextSize]}>{item?.accountName}</Animated.Text>
            <Animated.Text style={[styles.amount, balance]}>
              {formatMoney(
                item?.accounts?.[currentIndex]?.balance,
                item?.accounts?.[currentIndex]?.ccy,
              )}
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.currencyWrapper, currencyWrapper]}>
            {getCurrencies()}
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};
