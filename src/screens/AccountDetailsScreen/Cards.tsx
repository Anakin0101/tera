import React, { FC } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { CardItem } from './CardItem';
import { useStyles } from './AccountDetailsScreen.styles';
import { EmptyCards, Plus } from 'assets/SVGs';
import { CardsProps } from './AccountDetailsScreen.types';

// const dummyCards = [
//   {
//     name: 'ჩემი ბარათი',
//     isFavourite: true,
//     cardNumber: '**** 0453',
//     isBlocked: true,
//     isExpired: true,
//     type: 'MasterCard',
//   },
//   {
//     name: 'ჩემი ბარათი',
//     isFavourite: false,
//     cardNumber: '**** 0453',
//     isBlocked: false,
//     isExpired: false,
//     type: 'Visa',
//   },
// ];

const ListHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.cardsListHeader}>
      <Text demiBold size={18} children="products.cards" />
    </View>
  );
};

const ListFooter = () => {
  const styles = useStyles();
  return (
    <View style={styles.footerContainer}>
      <Button.Secondary text="products.cardRequest" fullWidth leftIcon={Plus} />
    </View>
  );
};

const EmptyComponent = () => {
  const styles = useStyles();
  return (
    <View style={styles.emptyCards}>
      <EmptyCards />
      <Text children="products.emptyCards" center marginTop={18} />
    </View>
  );
};

const Cards: FC<CardsProps> = ({ cards }) => {
  const styles = useStyles();
  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return <CardItem item={item} onPress={() => {}} isLast={index === cards.length - 1} />;
  };

  return (
    <View style={styles.cardListWrapper}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={EmptyComponent}
      />
      <Divider marginBottom={24} />
    </View>
  );
};

export default Cards;
