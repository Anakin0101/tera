import React, { FC, memo, useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { CardItem } from './CardItem';
import { EmptyCards, Plus } from 'assets/SVGs';
import { CardsProps } from './AccountDetailsScreen.types';
import { CardType } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './AccountDetailsScreen.styles';

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

export const Cards: FC<CardsProps> = memo(({ cards, fromCardDetails, isCardAccount, iban }) => {
  const styles = useStyles();

  const renderItem: ListRenderItem<CardType> = useCallback(
    ({ item, index }) => (
      <CardItem item={item} index={index} iban={iban} isLast={index === cards?.length - 1} />
    ),
    [cards.length, iban],
  );

  if (!isCardAccount) {
    return null;
  }

  return (
    <View style={fromCardDetails ? styles.CardListWrapperWithoutBorder : styles.wrapperWithBorder}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={EmptyComponent}
      />
      <Divider marginTop={32} />
    </View>
  );
});
