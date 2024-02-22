import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, DetailsItem } from 'components';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { TariffDescriptionSingle } from './TariffDescriptionSingle';
import { useStyles } from './TariffDescriptionSingle.styles';
import { useTranslation } from 'react-i18next';
import { openModal } from 'utils/modal';
import { PackagesOption } from './PackagesOption';
import { getCommissions, getIcon } from 'screens/TariffPackagesListScreen/utilis';
import { PackageProducts, PackageServiceNames } from 'services/apis/productsAPI/productsAPI.types';

export const TariffPackagesSingleScreen = () => {
  const { params } = useRoute<ProductsStackRouteProps<'TariffPackagesSingleScreen'>>();
  const { packageProducts, packageServices, name, id, isActive, pending } = params;
  const { commissionMnth, commissionYr } = getCommissions(packageServices);
  const styles = useStyles();
  const { t } = useTranslation();

  const onSelectPress = () => {
    openModal({
      element: <PackagesOption id={id} packageServices={packageServices} name={name} />,
      title: t('newDeposit.packageEdit'),
      disablePanning: true,
    });
  };

  const renderItem = ({ item, index }: { item: PackageProducts; index: number }) => {
    const isFirstItem = index === 0;
    const itemStyle = isFirstItem ? styles.firstItemStyle : styles.regularItemStyle;

    return (
      <View style={itemStyle}>
        <DetailsItem
          label={`${item.name} - ${item.productPrice}`}
          labelStyle={styles.label}
          valueStyle={styles.price}
          value={
            item.productPrice !== item.standardPriceMonthly &&
            ` ${t('newDeposit.withoutPackage')} ${item.standardPriceMonthly}`
          }
        />
      </View>
    );
  };

  return (
    <FlatList
      data={packageProducts}
      ListHeaderComponent={
        <TariffDescriptionSingle
          cardTypeName={name}
          icon={getIcon(name as PackageServiceNames)}
          id={id}
          pending={pending}
          status={isActive}
          commissionMnth={commissionMnth}
          commissionYr={commissionYr}
        />
      }
      renderItem={renderItem}
      keyExtractor={item => item.name}
      ListFooterComponent={
        !isActive ? (
          <Button.Primary onPress={onSelectPress} fixedWidth text={t('common.select')} />
        ) : null
      }
    />
  );
};
