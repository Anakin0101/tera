import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Spacing } from 'theme/Variables';
import { horizontalScale } from 'utils/config';
import { ActionButtons } from './ActionButtons';
import Indicator from 'components/CardsAndBalance/Indicator';
import { SliderProps, ViewableItems } from './Slider.types';
import { useStyles } from './Slider.styles';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
  minimumViewTime: 300,
};

const interval = horizontalScale(340) + Spacing.m;

const ReanimatedFlatlist = Animated.createAnimatedComponent<any>(FlatList);

export const Slider = <ItemT,>({
  actions,
  data,
  index,
  setActiveIndex,
  renderItem: Item,
  actionButtonsContainer,
}: SliderProps<ItemT>) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);
  const ref = useRef<FlatList>(null);

  const scrollTo = (idx: number) => {
    try {
      ref?.current?.scrollToOffset({
        offset: interval * idx,
        animated: false,
      });
    } catch (err) {
      console.warn('Error in Slider method: scrollTo', err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setTimeout(() => scrollTo(index), 0);
    } else {
      scrollTo(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: ViewableItems) => {
      if (viewableItems && viewableItems.length) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    },
    [setActiveIndex],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem = ({ item }: { item: ItemT }) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.slider}>
      <View>
        <ReanimatedFlatlist
          ref={ref}
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
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialNumToRender={data?.length}
        />
      </View>
      <ActionButtons actions={actions} actionButtonsContainer={actionButtonsContainer} />
      <Indicator data={data} translateX={translateX} hideFirst={false} />
    </View>
  );
};
