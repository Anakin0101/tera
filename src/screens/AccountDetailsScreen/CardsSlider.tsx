import React, { FC } from 'react';
import { ListRenderItem, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Spacing } from 'theme/Variables';
import { horizontalScale } from 'utils/config';
import { ActionButtons } from './ActionButtons';
import Indicator from 'components/CardsAndBalance/Indicator';
import { useStyles } from './AccountDetailsScreen.styles';
import { CardSliderItem } from './CardSliderItem';
import { CardsSliderProps, SliderData } from './AccountDetailsScreen.types';

export const CardsSlider: FC<CardsSliderProps> = ({ actions, iban, data }) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<SliderData> = ({ item }) => {
    return <CardSliderItem item={item} iban={iban} />;
  };

  return (
    <View style={styles.cardsSlider}>
      <View>
        <Animated.FlatList
          horizontal
          pagingEnabled
          data={data}
          renderItem={renderItem}
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={horizontalScale(340) + Spacing.m}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      <ActionButtons actions={actions} />
      <Indicator data={data} translateX={translateX} hideFirst={false} />
    </View>
  );
};
