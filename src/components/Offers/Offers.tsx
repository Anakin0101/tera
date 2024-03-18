import React, { FC, useCallback } from 'react';
import { ListRenderItem, View, Image, Pressable } from 'react-native';
import { OffersProps } from './Offers.types';
import { horizontalScale } from 'utils/config';
import { useStyles } from './Offers.styles';
import useTheme from 'hooks/useTheme';
import { Text } from 'components';
import Indicator from 'components/CardsAndBalance/Indicator';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { IMAGE_COVER } from 'constants/Images';
import { OfferTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { CreditDisbursement } from './CreditDisbursement';

export const Offers: FC<OffersProps> = ({ data, showAll = true }) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);
  const { Colors } = useTheme();
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => {
      if (item?.type === OfferTypeEnum.CreditDisbursement) {
        return <CreditDisbursement item={item} />;
      }

      return (
        <Image
          resizeMode={IMAGE_COVER}
          source={{ uri: `data:image/jpeg;base64,${item?.imageBase64}` }}
          style={item?.length === 1 ? styles.offerLengthOne : styles.offer}
        />
      );
    },
    [styles.offer, styles.offerLengthOne],
  );

  return (
    <>
      {data?.length ? (
        <View style={styles.offersWrapper}>
          <View style={styles.headerWrapper}>
            <Text
              children="products.offers"
              demiBold
              size={18}
              lineHeight={22}
              style={styles.title}
            />
            {showAll && data?.length > 1 ? (
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
