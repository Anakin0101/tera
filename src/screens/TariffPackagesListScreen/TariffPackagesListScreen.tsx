import React from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { TariffDescription } from './TariffDescription';
import { TariffCardLayout } from 'components/TariffCard/TariffCardLayout';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { TARIFF_PACKAGES_SINGLE_SCREEN } from 'navigation/ScreenNames';
import { useTariffPackages } from './container';
import { CustomerPackages } from 'services/apis/productsAPI/productsAPI.types';
import { LoadingInView } from 'components/LoadingView/LoadingInView';
import { getCommissions } from './utilis';
import Images from 'theme/Images';
import { useTranslation } from 'react-i18next';

export const TariffPackagesListScreen = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'TariffPackagesSingleScreen'>>();
  const { packagesList, packagesIsLoading } = useTariffPackages();
  const hasStatusOrPending = packagesList?.customerPackages?.some(
    item => item.isActive || item.pending,
  );

  const { t } = useTranslation();

  const onLocationsPress = () => {
    //todo
    //if true - navigate specific screen
  };

  const renderItem = ({ item }: { item: CustomerPackages }) => {
    const { commissionMnth, commissionYr } = getCommissions(item?.packageServices);
    const onTariffSingleScreen = () => {
      navigate(TARIFF_PACKAGES_SINGLE_SCREEN, { ...item });
    };

    return (
      <Pressable onPress={!hasStatusOrPending ? onTariffSingleScreen : undefined}>
        <TariffCardLayout
          cardTypeName={item.name}
          id={item.id}
          icon={item.name}
          status={item.isActive}
          pending={item.pending}
          commissionMnth={commissionMnth}
          commissionYr={commissionYr}
          applyOverlay={hasStatusOrPending}
        />
      </Pressable>
    );
  };

  if (packagesIsLoading) {
    return <LoadingInView />;
  }

  return (
    <ScrollView>
      <TariffDescription />
      {packagesList?.customerPackages && packagesList?.customerPackages.length > 0 ? (
        <FlatList
          data={packagesList?.customerPackages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Pressable onPress={onLocationsPress}>
          <TariffCardLayout
            cardTypeName={t('newDeposit.offices')}
            icon={Images().Location}
            noData={true}
          />
        </Pressable>
      )}
    </ScrollView>
  );
};
