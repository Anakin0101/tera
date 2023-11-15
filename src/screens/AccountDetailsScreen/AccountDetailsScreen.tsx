import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import Cards from './Cards';
import { Details } from './Details';
import { CardsSlider } from './CardsSlider';
import { LastTransactions } from 'components';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './AccountDetailsScreen.styles';
import { useAccountDetails } from './container';
import { Card, Note, Share, Swap } from 'assets/SVGs';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'cards', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
];

const actions = [
  {
    title: 'products.transfer',
    icon: <Swap />,
  },
  {
    title: 'products.payments',
    icon: <Card />,
  },
  {
    title: 'products.requisite',
    icon: <Note />,
  },
  {
    title: 'products.share',
    icon: <Share />,
  },
];

export const AccountDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'AccountDetailsScreen'>>();
  const { account, groupedCardsByPan, lastTransactions } = useAccountDetails(params.iban);

  if (!account) {
    return null;
  }

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'main':
        return <CardsSlider data={actions} iban={params.iban} />;
      case 'cards':
        return (
          <Cards
            cards={groupedCardsByPan}
            isCardAccount={account.isCardAccount}
            iban={params.iban}
          />
        );
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
