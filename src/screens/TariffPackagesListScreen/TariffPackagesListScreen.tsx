import React from 'react';
import { Alert, FlatList } from 'react-native';
import { TariffDescription } from './TariffDescription';
import { TariffCardLayout } from 'components/TariffCard/TariffCardLayout';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { TARIFF_PACKAGES_SINGLE_SCREEN } from 'navigation/ScreenNames';
import { useTariffPackages } from './container';
import { CustomerPackages } from 'services/apis/productsAPI/productsAPI.types';
import { LoadingInView } from 'components/LoadingView/LoadingInView';
import { getCommissions, getIcon } from './utilis';
import Images from 'theme/Images';
import { useTranslation } from 'react-i18next';

export const TariffPackagesListScreen = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'TariffPackagesSingleScreen'>>();
  const { packagesList, packagesIsLoading } = useTariffPackages();
  const hasStatusOrPending = packagesList?.customerPackages?.some(item => item.pending);

  const { t } = useTranslation();

  const onLocationsPress = () => {
    Alert.alert('navigate to offices screen');
  };

  const renderItem = ({ item }: { item: CustomerPackages }) => {
    const { commissionMnth, commissionYr } = getCommissions(item?.packageServices);
    const onTariffSingleScreen = () => {
      navigate(TARIFF_PACKAGES_SINGLE_SCREEN, { ...item });
    };

    return (
      <TariffCardLayout
        cardTypeName={item.name}
        id={item.id}
        icon={getIcon(item.name)}
        status={item.isActive}
        pending={item.pending}
        commissionMnth={commissionMnth}
        commissionYr={commissionYr}
        applyOverlay={hasStatusOrPending}
        onPress={!hasStatusOrPending ? onTariffSingleScreen : undefined}
      />
    );
  };

  if (packagesIsLoading) {
    return <LoadingInView />;
  }

  const isData = packagesList?.customerPackages && packagesList?.customerPackages.length > 0;

  return (
    <>
      <TariffDescription noData={!isData ? true : false} />
      {isData ? (
        <FlatList
          data={packagesList?.customerPackages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <TariffCardLayout
          cardTypeName={t('newDeposit.offices')}
          icon={Images().Location}
          noData={true}
          onPress={onLocationsPress}
        />
      )}
    </>
  );
};
