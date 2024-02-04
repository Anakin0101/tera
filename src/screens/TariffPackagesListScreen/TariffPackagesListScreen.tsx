import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TariffDescription } from './TariffDescription';
import { TariffCardLayout } from 'components/TariffCard/TariffCardLayout';
import { TariffCardProps } from 'components/TariffCard/TariffCardLayout.types';
import Images from 'theme/Images';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { TARIFF_PACKAGES_SINGLE_SCREEN } from 'navigation/ScreenNames';

export const TariffPackagesListScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<ProductsStackScreenProps<'TariffPackagesSingleScreen'>>();

  //dummy data until link API
  const dummy_data_for_tariff = [
    {
      cardTypeName: 'CLASSIC',
      commissionMnth: 2,
      commissionYr: 25,
      icon: Images().ClasicMedal,
      status: t('newDeposit.cardStatus'),
      id: '1',
    },

    {
      cardTypeName: 'PLATINUM',
      commissionMnth: 2,
      commissionYr: 25,
      icon: Images().PlatinumMedal,
      id: '2',
    },
    {
      cardTypeName: 'GOLD',
      commissionMnth: 2,
      commissionYr: 25,
      icon: Images().GoldMedal,
      id: '3',
    },
  ];
  const renderItem = ({ item }: { item: TariffCardProps }) => {
    const onTariffSingleScreen = () => {
      navigate(TARIFF_PACKAGES_SINGLE_SCREEN, { ...item });
    };

    return (
      <Pressable onPress={onTariffSingleScreen}>
        <TariffCardLayout
          cardTypeName={item.cardTypeName}
          commissionMnth={item.commissionMnth}
          commissionYr={item.commissionYr}
          icon={item.icon}
          id={item.id}
          status={item.status}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={dummy_data_for_tariff}
      ListHeaderComponent={<TariffDescription />}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};
