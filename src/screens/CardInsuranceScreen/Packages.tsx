import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Text } from 'components';
import { config } from 'utils/config';
import { Spacing } from 'theme/Variables';
import Indicator from 'components/CardsAndBalance/Indicator';
import { InsurancePackageItem } from './InsurancePackageItem';
import { CardInsuranceProducts } from 'services/apis/productsAPI/productsAPI.types';
import { PackagesProps, RenderItem } from './CardInsuranceScreen.types';
import { useStyles } from './CardInsuranceScreen.styles';

export const Packages: FC<PackagesProps> = ({ iban, activeCard, packages = [] }) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: RenderItem = useCallback(
    ({ item }) => <InsurancePackageItem activeCard={activeCard} item={item} iban={iban} />,
    [activeCard, iban],
  );

  const keyExtractor = useCallback(
    (item: CardInsuranceProducts) => String(item?.insuranceTypeId),
    [],
  );

  return (
    <View style={styles.packagesContainer}>
      <Text children="products.choosePackage" style={styles.header} />
      <Animated.FlatList
        horizontal
        data={packages}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate="fast"
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        snapToInterval={config.mobileWidth - 2 * Spacing.xl + 12}
        contentContainerStyle={styles.listContentContainer}
      />
      <Indicator data={packages} translateX={translateX} hideFirst={false} />
    </View>
  );
};
