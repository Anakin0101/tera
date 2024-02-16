import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { TariffDescription } from './TariffDescription';
import { TariffCardLayout } from 'components/TariffCard/TariffCardLayout';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { TARIFF_PACKAGES_SINGLE_SCREEN } from 'navigation/ScreenNames';
import { useTariffPackages } from './container';
import { CustomerPackages } from 'services/apis/productsAPI/productsAPI.types';
import { LoadingInView } from 'components/LoadingView/LoadingInView';
import { getCommissions } from './utilis';

export const TariffPackagesListScreen = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'TariffPackagesSingleScreen'>>();
  const { packagesList, packagesIsLoading } = useTariffPackages();

  const renderItem = ({ item }: { item: CustomerPackages }) => {
    const { commissionMnth, commissionYr } = getCommissions(item?.packageServices);
    const onTariffSingleScreen = () => {
      navigate(TARIFF_PACKAGES_SINGLE_SCREEN, { ...item });
    };

    return (
      <Pressable onPress={onTariffSingleScreen}>
        <TariffCardLayout
          cardTypeName={item.name}
          id={item.id}
          icon={item.name}
          status={item.isActive}
          pending={item.pending}
          commissionMnth={commissionMnth}
          commissionYr={commissionYr}
        />
      </Pressable>
    );
  };

  return (
    <>
      {!packagesIsLoading && packagesList ? (
        <FlatList
          data={packagesList.customerPackages}
          ListHeaderComponent={<TariffDescription />}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <LoadingInView />
      )}
    </>
  );
};
