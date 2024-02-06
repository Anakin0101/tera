import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { Button } from 'components';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { TariffDescriptionSingle } from './TariffDescriptionSingle';
import { TariffProductsProps } from 'components/TariffProducts/TariffProducts.types';
import { TariffProductsLayout } from 'components/TariffProducts/TariffProductsLayout';
import { useStyles } from './TariffDescriptionSingle.styles';
import { CheckStatic } from 'assets/SVGs/CheckStatic';
import { useTranslation } from 'react-i18next';
import { openModal } from 'utils/modal';
import { PackagesOption } from './PackagesOption';

export const TariffPackagesSingleScreen = () => {
  const { params } = useRoute<ProductsStackRouteProps<'TariffPackagesSingleScreen'>>();
  const styles = useStyles();
  const { t } = useTranslation();

  const Tariff_Products_Dummy_Data = [
    {
      id: '1',
      title: 'მიმდინარე ანგარიშის გახსნა ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      status: 'აქტიური',
      icon: <CheckStatic />,
    },
    {
      id: '2',
      title: 'მიმდინარე ანგარიშის მომსახურების საკომისიო ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      status: 'აქტიური',
      icon: <CheckStatic />,
    },
    {
      id: '3',
      title: 'Visa Classic/MC Standard  ბარათი (ბარათის ვადა 2 წელი) ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      status: 'გაიაქტიურე',
      icon: <CheckStatic />,
    },
    {
      id: '4',
      title: 'ინტერნეტბანკი/ტელეფონბანკი/მობაილბანკი ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      status: 'გაიაქტიურე',
      icon: <CheckStatic />,
    },
    {
      id: '5',
      title: 'SMS ბანკი ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      status: 'გაიაქტიურე',
      icon: <CheckStatic />,
    },
    {
      id: '6',
      title: 'ავტომატური გადახდები ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      status: 'გაიაქტიურე',
      icon: <CheckStatic />,
    },
    {
      id: '7',
      title: 'მუდმივი საგადასახადო დავალება ',
      priceTitle: 'უფასო',
      price: '2.00 ₾',
      icon: <CheckStatic />,
    },
  ];

  const onSelectPress = () => {
    openModal({
      element: <PackagesOption />,
      title: 'პაკეტის რედაქტირება',
      disablePanning: true,
    });
  };

  const renderItem = ({ item, index }: { item: TariffProductsProps; index: number }) => {
    const isFirstItem = index === 0;
    const itemStyle = isFirstItem ? styles.firstItemStyle : styles.regularItemStyle;

    return (
      <Pressable style={itemStyle}>
        <TariffProductsLayout
          id={item.id}
          title={item.title}
          priceTitle={item.priceTitle}
          price={item.price}
          status={item.status}
          icon={item.icon}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={Tariff_Products_Dummy_Data}
      ListHeaderComponent={<TariffDescriptionSingle {...params} />}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={
        <Button.Primary onPress={onSelectPress} fixedWidth text={t('common.select')} />
      }
    />
  );
};
