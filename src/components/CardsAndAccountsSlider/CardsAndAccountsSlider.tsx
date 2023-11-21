import React, { FC, useCallback, useEffect, useRef } from 'react';
import { FlatList, ListRenderItem, Platform, View } from 'react-native';
import { AccountsSliderData, SliderProps, ViewableItems } from './CardsAndAccountsSlider.types';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { horizontalScale } from 'utils/config';
import { Spacing } from 'theme/Variables';
import { CardSliderItem } from './CardSliderItem';
import { CardType, DepositType } from 'services/apis/productsAPI/productsAPI.types';
import { ActionButtons } from './ActionButtons';
import Indicator from 'components/CardsAndBalance/Indicator';
import { AccountSliderItem } from './AccountSliderItem';
import { useStyles } from './CardsAndAccountsSlider.styles';
import { DepositSliderItem } from './DepositSliderItem';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
  minimumViewTime: 300,
};

const interval = horizontalScale(340) + Spacing.m;

const ReanimatedFlatlist = Animated.createAnimatedComponent<any>(FlatList);

export const CardsAndAccountsSlider: FC<SliderProps> = ({
  actions,
  iban,
  data,
  index,
  setActiveIndex,
  displayCards,
  type,
}) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);
  const ref = useRef<FlatList>(null);

  const scrollTo = (idx: number) => {
    ref?.current?.scrollToOffset({
      offset: interval * idx,
      animated: true,
    });
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setTimeout(() => scrollTo(index), 0);
    } else {
      scrollTo(index);
    }
  }, [index]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: ViewableItems) => {
      if (viewableItems.length) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    },
    [setActiveIndex],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderAccountItem: ListRenderItem<AccountsSliderData> = ({ item }) => {
    return <AccountSliderItem item={item} iban={iban} />;
  };

  const renderCardItem: ListRenderItem<CardType> = ({ item }) => {
    return <CardSliderItem item={item} />;
  };

  const renderDepositItem: ListRenderItem<DepositType> = ({ item }) => {
    return <DepositSliderItem item={item} />;
  };

  return (
    <View style={styles.slider}>
      <View>
        <ReanimatedFlatlist
          ref={ref}
          horizontal
          pagingEnabled
          data={data}
          renderItem={
            type === 'Deposit'
              ? renderDepositItem
              : displayCards
              ? renderCardItem
              : renderAccountItem
          }
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={horizontalScale(340) + Spacing.m}
          contentContainerStyle={styles.contentContainer}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
      <ActionButtons actions={actions} />
      <Indicator data={data} translateX={translateX} hideFirst={false} />
    </View>
  );
};
