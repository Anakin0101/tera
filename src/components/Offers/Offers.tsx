import React, { FC } from 'react';
import { ListRenderItem, View, Image, Pressable } from 'react-native';
import { OffersProps } from './Offers.types';
import { config, horizontalScale } from 'utils/config';
import { useStyles } from './Offers.styles';
import useTheme from 'hooks/useTheme';
import { Text } from 'components';
import Indicator from 'components/CardsAndBalance/Indicator';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { IMAGE_COVER } from 'constants/Images';

const padding = config.mobileWidth - horizontalScale(320) - 24;

export const Offers: FC<OffersProps> = ({ data }) => {
  const styles = useStyles(padding);
  const translateX = useSharedValue(0);
  const { Colors } = useTheme();
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return (
      <Image
        resizeMode={IMAGE_COVER}
        source={{ uri: `data:image/jpeg;base64,${item?.imageBase64}` }}
        style={item?.length === 1 ? styles.offerLengthOne : styles.offer}
      />
    );
  };
  return (
    <>
      {data ? (
        <View style={styles.offersWrapper}>
          <View style={styles.headerWrapper}>
            <Text children="products.Offers" demiBold style={styles.title} />
            {data?.length > 1 ? (
              <Pressable>
                <Text
                  children={'dashboard.all'}
                  style={styles.titleContainer}
                  color={Colors.primary}
                />
              </Pressable>
            ) : null}
          </View>
          <Animated.FlatList
            horizontal
            pagingEnabled
            data={data}
            renderItem={renderItem}
            scrollEnabled={data.length > 1}
            decelerationRate="fast"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            style={styles.list}
            showsHorizontalScrollIndicator={false}
            snapToInterval={horizontalScale(320) + 12}
            contentContainerStyle={styles.contentContainer}
          />
          <Indicator
            data={data.length > 1 ? data : null}
            translateX={translateX}
            hideFirst={false}
          />
        </View>
      ) : null}
    </>
  );
};

export default Offers;
