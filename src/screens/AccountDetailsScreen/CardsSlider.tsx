import React from 'react';
import { ListRenderItem, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Spacing } from 'theme/Variables';
import { horizontalScale } from 'utils/config';
import { ActionButtons } from './ActionButtons';
import Indicator from 'components/CardsAndBalance/Indicator';
import { useStyles } from './AccountDetailsScreen.styles';
import { CardSliderItem } from './CardSliderItem';

const accounts = [
  {
    id: 1,
    name: 'ჩემი ანგარიში',
    isBlocked: true,
    isFavourite: false,
    debt: 0,
  },
  {
    id: 2,
    name: 'ჩემი ანგარიში',
    isBlocked: false,
    isFavourite: false,
    debt: 300,
  },
  {
    id: 3,
    name: 'ჩემი ანგარიში',
    isBlocked: false,
    isFavourite: false,
    debt: 0,
  },
  {
    id: 4,
    name: 'ჩემი ანგარიში',
    isBlocked: false,
    isFavourite: true,
    debt: 0,
  },
];

export const CardsSlider = () => {
  const styles = useStyles();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return <CardSliderItem item={item} />;
  };

  return (
    <View style={styles.cardsSlider}>
      <View>
        <Animated.FlatList
          horizontal
          pagingEnabled
          data={accounts}
          renderItem={renderItem}
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={horizontalScale(340) + Spacing.m}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      <ActionButtons />
      <Indicator data={accounts} translateX={translateX} hideFirst={false} />
    </View>
  );
};
