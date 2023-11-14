import React, { useRef } from 'react';
import { ProductsTabBar } from 'components';
import { FlatList, ListRenderItem } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { config } from 'utils/config';
import TeraBankProducts from './TeraBankProducts';
import OtherBanksProducsts from './OtherBanksProducsts';

export const ProductsScreen = () => {
  const flatlistRef = useRef<FlatList>(null);
  const translateX = useSharedValue(0);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    switch (item) {
      case 'terabank':
        return <TeraBankProducts />;
      case 'otherbanks':
        return <OtherBanksProducsts />;
      default:
        return null;
    }
  };

  const onTabPress = (index: number) => {
    translateX.value = withTiming(index * config.mobileWidth);
    flatlistRef.current?.scrollToOffset({
      animated: true,
      offset: index * config.mobileWidth,
    });
  };

  return (
    <>
      <ProductsTabBar onTabPress={onTabPress} translateX={translateX} />
      <FlatList
        horizontal
        pagingEnabled
        ref={flatlistRef}
        scrollEnabled={false}
        initialNumToRender={1}
        scrollEventThrottle={16}
        renderItem={renderItem}
        data={['terabank', 'otherbanks']}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};
