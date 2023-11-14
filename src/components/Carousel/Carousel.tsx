import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, FlatList, ListRenderItem, Image } from 'react-native';
import { Dots } from './Dots';
import { config } from 'utils/config';
import { Spacing } from 'theme/Variables';
import { Button, Text } from 'components/index';
import { CarouselProps, IItem } from './Carousel.types';
import useStyles from './Carousel.styles';

const { mobileWidth } = config;
const SLIDE_WIDTH = mobileWidth - 2 * Spacing.xl;

export const Carousel: FC<CarouselProps> = ({
  gap,
  data,
  dotStyle,
  descStyle,
  withTimer,
  titleStyle,
  resizeMode,
  delay = 5000,
  skipable = true,
  dotContainerStyle,
  textContainerStyle,
  imageContainerStyle,
  buttonContainerStyle,
  skipButtonContainerStyle,
  onSkip,
  onTimeout,
}) => {
  const styles = useStyles();
  const flatlistRef = useRef<FlatList>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const translateX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSkip = useCallback(() => {
    clearTimeout(timerRef.current);
    onSkip?.();
  }, [onSkip]);

  const handleNext = useCallback(() => {
    if (activeIndex === data.length - 1) {
      handleSkip();
    }

    if (activeIndex !== data.length - 1) {
      flatlistRef.current?.scrollToOffset({
        offset: (activeIndex + 1) * SLIDE_WIDTH,
        animated: true,
      });
      setActiveIndex(prev => prev + 1);
    }
  }, [activeIndex, data, handleSkip]);

  const toLastSlide = () => {
    if (activeIndex !== data.length - 1) {
      clearTimeout(timerRef.current);
      flatlistRef.current?.scrollToOffset({
        offset: (data.length - 1) * SLIDE_WIDTH,
        animated: true,
      });
      setActiveIndex(data.length - 1);
    }
  };

  useEffect(() => {
    if (withTimer) {
      timerRef.current = setTimeout(() => {
        if (activeIndex === data.length - 1) {
          onTimeout?.();
          return;
        }
        handleNext();
      }, delay);
    }

    return () => clearTimeout(timerRef.current);
  }, [activeIndex, data, delay, handleNext, onTimeout, withTimer]);

  const renderItem: ListRenderItem<IItem> = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={[styles.imageContainer, imageContainerStyle]}>
          <Image source={item.image} style={styles.image} resizeMode={resizeMode} />
        </View>
        <View style={[styles.textContainer, textContainerStyle]}>
          <Text children={item.title} headline style={[styles.title, titleStyle]} />
          <Text children={item.desc} style={[styles.desc, descStyle]} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <Animated.FlatList
          ref={flatlistRef}
          data={data}
          horizontal
          bounces={false}
          pagingEnabled={true}
          scrollEnabled={false}
          renderItem={renderItem}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: translateX } } }], {
            useNativeDriver: true,
          })}
        />
      </View>
      <Dots
        gap={gap}
        data={data}
        dotStyle={dotStyle}
        translateX={translateX}
        activeIndex={activeIndex}
        dotContainerStyle={dotContainerStyle}
      />
      <View style={[styles.buttonContainer, buttonContainerStyle]}>
        <Button.Primary text="onboarding.next" onPress={handleNext} fullWidth />
        {skipable && (
          <View style={skipButtonContainerStyle}>
            <Button.Text
              text="onboarding.skip"
              onPress={onSkip ? handleSkip : toLastSlide}
              customTextStyle={styles.skipLabel}
            />
          </View>
        )}
      </View>
    </View>
  );
};
