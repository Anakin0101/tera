import React from 'react';
import { SectionList, View } from 'react-native';
import { Details } from '../AccountDetailsScreen/Details';
import { Slider, LastTransactions, Wallet } from 'components';
import { useStyles } from './CardDetailsScreen.styles';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { CardHolderDetails } from './CardHolderDetails';
import { useCardDetails } from './container';
import { TemporarilyInactiveDetails } from '../AccountDetailsScreen/TemporarilyInactiveDetails';
import { CardSliderItem } from './CardSliderItem';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'wallet', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'information', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const CardDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'CardDetailsScreen'>>();

  const { actions, cards, card, blockedAmounts, lastTransactions, activeIndex, setActiveIndex } =
    useCardDetails(params.index);

  const renderItem: SectionListRenderItemT = ({ section }) => {
    if (card.status === 13 && section.title !== 'main' && section.title !== 'details') {
      return null;
    }
    switch (section.title) {
      case 'main':
        return (
          <Slider
            data={cards}
            renderItem={CardSliderItem}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 'wallet':
        return <Wallet />;
      case 'details':
        if (card.status !== 13) {
          return (
            <CardHolderDetails
              accountNumber={card.pan}
              endDate={card.endDate}
              cvv={String(card.priority)}
            />
          );
        } else {
          return (
            <TemporarilyInactiveDetails
              cardHolder={card.cardHolder}
              name={card?.cardProductName}
              insure="products.insure"
              displayDivider={!!lastTransactions?.length}
              blockedAmounts={blockedAmounts}
            />
          );
        }
      case 'information':
        return (
          <Details
            cardHolder={card.cardHolder}
            name={card?.cardProductName}
            insure="products.insure"
            displayDivider={!!lastTransactions?.length}
            blockedAmounts={blockedAmounts}
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
