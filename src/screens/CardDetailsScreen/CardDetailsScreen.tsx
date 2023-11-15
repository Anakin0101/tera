import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { Details } from '../AccountDetailsScreen/Details';
import { CardsSlider } from '../AccountDetailsScreen/CardsSlider';
import { LastTransactions, Wallet } from 'components';
import { useStyles } from './CardDetailsScreen.styles';
import { Block, Insurance, Pincode } from 'assets/SVGs';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';

const actions = [
  {
    title: 'products.transfer',
    icon: <Block />,
  },
  {
    title: 'products.payments',
    icon: <Insurance />,
  },
  {
    title: 'products.requisite',
    icon: <Pincode />,
  },
];

const sections = [
  { title: 'main', data: [{}] },
  { title: 'wallet', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const CardDetailsScreen = () => {
  const { params } = useRoute<ProductsStackRouteProps<'CardDetailsScreen'>>();
  const { lastTransactions } = useAppSelector(state => state.products);
  const account = useAppSelector(state =>
    state.products.groupedAccountsByIban.find(acc => acc.iban === params.iban),
  );
  if (!account) {
    return null;
  }

  const styles = useStyles();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'main':
        return <CardsSlider data={actions} iban={params.iban} />;
      case 'wallet':
        return <Wallet />;
      case 'details':
        return (
          <Details
            name={account?.accountName}
            iban={account?.iban}
            displayDivider={!!lastTransactions?.length}
          />
        );
      case 'transactions':
        return (
          <LastTransactions
            data={lastTransactions}
            sectionTitle="products.lastTransactions"
            style={styles.transactionsContainer}
            headerLabelStyle={styles.headerLabelStyle}
            headerContaienrStyle={styles.backgroundWhite}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};
