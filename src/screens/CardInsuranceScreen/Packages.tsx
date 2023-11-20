import React, { FC } from 'react';
import { ListRenderItem, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Text } from 'components';
import { config } from 'utils/config';
import { Spacing } from 'theme/Variables';
import Indicator from 'components/CardsAndBalance/Indicator';
import { InsurancePackageItem } from './InsurancePackageItem';
import { InsurancePackage, PackagesProps } from './CardInsuranceScreen.types';
import { useStyles } from './CardInsuranceScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';

const data: InsurancePackage[] = [
  {
    id: 1,
    name: 'სტანდარტი',
    commission: 5,
    commissionCcy: 'GEL',
    isSelected: false,
    terms: [
      {
        name: 'ჩიპიან ბარათებზე პინის ან ჩიპის გარეშე ჩატარებული  ტრანზაქცია (40 ლარის ზევით)',
        limit: 200,
        ccy: 'GEL',
      },
      {
        name: 'ინტერნეტით ჩატარებული ტრანზაქცია',
        limit: 500,
        ccy: 'GEL',
      },
      {
        name: 'უავტორიზაციო ტრანზაქცია',
        limit: 200,
        ccy: 'GEL',
      },
    ],
  },
  {
    id: 2,
    name: 'მედიუმი',
    commission: 10,
    commissionCcy: 'GEL',
    isSelected: false,
    terms: [
      {
        name: 'ჩიპიან ბარათებზე პინის ან ჩიპის გარეშე ჩატარებული  ტრანზაქცია (40 ლარის ზევით)',
        limit: 400,
        ccy: 'GEL',
      },
      {
        name: 'ინტერნეტით ჩატარებული ტრანზაქცია',
        limit: 1000,
        ccy: 'GEL',
      },
      {
        name: 'უავტორიზაციო ტრანზაქცია',
        limit: 500,
        ccy: 'GEL',
      },
    ],
  },
  {
    id: 3,
    name: 'პრემიუმი',
    commission: 15,
    commissionCcy: 'GEL',
    isSelected: false,
    terms: [
      {
        name: 'ჩიპიან ბარათებზე პინის ან ჩიპის გარეშე ჩატარებული  ტრანზაქცია (40 ლარის ზევით)',
        limit: 600,
        ccy: 'GEL',
      },
      {
        name: 'ინტერნეტით ჩატარებული ტრანზაქცია',
        limit: 1500,
        ccy: 'GEL',
      },
      {
        name: 'უავტორიზაციო ტრანზაქცია',
        limit: 1000,
        ccy: 'GEL',
      },
    ],
  },
];

export const Packages: FC<PackagesProps> = ({ cardId }) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);
  const { navigate } = useNavigation<ProductsStackScreenProps<'InsurancePackageDetailsScreen'>>();

  const handlePress = (packageName: string, commission: number) => {
    navigate('InsurancePackageDetailsScreen', {
      packageName,
      commission,
      cardId,
    });
  };

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<InsurancePackage> = ({ item }) => {
    return <InsurancePackageItem item={item} onPress={handlePress} />;
  };

  return (
    <View style={styles.packagesContainer}>
      <Text children="products.choosePackage" style={styles.header} />
      <Animated.FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate="fast"
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        snapToInterval={config.mobileWidth - 2 * Spacing.xl + 12}
        contentContainerStyle={styles.listContentContainer}
      />
      <Indicator data={data} translateX={translateX} hideFirst={false} />
    </View>
  );
};
