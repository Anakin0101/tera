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

const sections = [
  { title: 'main', data: [{}] },
  { title: 'cards', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
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
        return <CardsSlider />;
      case 'cards':
        return <Cards cards={groupedCardsByPan} />;
      case 'details':
        return <Details name={account?.accountName} iban={account?.iban} />;
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
