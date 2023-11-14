import React, { FC } from 'react';
import { ListRenderItem, View } from 'react-native';
import { OffersProps } from './Offers.types';
import { config, horizontalScale } from 'utils/config';
import { useStyles } from './Offers.styles';
import { CheckShield } from 'assets/SVGs';
import { Text } from '../index';
import Indicator from 'components/CardsAndBalance/Indicator';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const padding = config.mobileWidth - horizontalScale(320) - 24;

export const Offers: FC<OffersProps> = ({ data }) => {
  const styles = useStyles(padding);
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return (
      <View style={styles.offer}>
        <CheckShield />
        <View style={styles.offerDesc}>
          <Text title children={item.title} bold />
          <Text label children={item.desc} marginTop={12} />
          <View style={styles.more}>
            <Text label children="products.more" color="white" />
          </View>
        </View>
      </View>
    );
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Text children="products.offers" demiBold style={styles.title} />
      <Animated.FlatList
        horizontal
        pagingEnabled
        data={data}
        renderItem={renderItem}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        snapToInterval={horizontalScale(320) + 12}
        contentContainerStyle={styles.contentContainer}
      />
      <Indicator data={data} translateX={translateX} hideFirst={false} />
    </>
  );
};

export default Offers;
