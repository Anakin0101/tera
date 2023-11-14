import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import Cards from '../AccountDetailsScreen/Cards';
import { Details } from '../AccountDetailsScreen/Details';
import { CardsSlider } from '../AccountDetailsScreen/CardsSlider';
import { LastTransactions, Wallet } from 'components';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './CardDetailsScreen.styles';
import { useAccountDetails } from '../AccountDetailsScreen/container';

const lastTransactions = [
  {
    title: 'რონის პიცა',
    value: 'კვება',
    amount: 320.5,
    date: '20 სექ, 2021, 12:20',
  },
  {
    title: 'მანქანის დაზღვევა',
    value: 'ფინანსები',
    amount: 410,
    date: '20 სექ, 2021, 12:20',
  },
  {
    title: 'პირადი გადარიცხვა',
    value: 'პირადი გადარიცხვა',
    amount: 250,
    date: '20 სექ, 2021, 12:20',
  },
  {
    title: 'პირადი გადარიცხვა',
    value: 'პირადი გადარიცხვა',
    amount: 25.7,
    date: '20 სექ, 2021, 12:20',
  },
];

const sections = [
  { title: 'main', data: [{}] },
  { title: 'wallet', data: [{}] },
  { title: 'cards', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const CardDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'CardDetailsScreen'>>();

  const { groupedCardsByPan } = useAccountDetails(params.iban);

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'main':
        return <CardsSlider />;
      case 'wallet':
        return <Wallet />;
      case 'cards':
        return <Cards cards={groupedCardsByPan} fromCardDetails />;
      case 'details':
        return <Details />;
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
