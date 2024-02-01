import React from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TariffDescription } from './TariffDescription';
import { TariffCardLayout } from 'components/TariffCard/TariffCardLayout';
import { TariffCardCardProps } from 'components/TariffCard/TariffCardLayout.types';
import Images from 'theme/Images';

export const TariffPackagesListScreen = () => {
  const { t } = useTranslation();

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
  const renderItem = ({ item }: { item: TariffCardCardProps }) => {
    return (
      <TariffCardLayout
        cardTypeName={item.cardTypeName}
        commissionMnth={item.commissionMnth}
        commissionYr={item.commissionYr}
        icon={item.icon}
        id={item.id}
        status={item.status}
      />
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
