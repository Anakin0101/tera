import React, { FC } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { CardItem } from './CardItem';
import { useStyles } from './AccountDetailsScreen.styles';
import { EmptyCards, Plus } from 'assets/SVGs';
import { CardsProps } from './AccountDetailsScreen.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { CardType } from 'services/apis/productsAPI/productsAPI.types';

const ListHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.cardsListHeader}>
      <Text demiBold size={18} children="products.cards" />
    </View>
  );
};

const ListFooter = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardDetailsScreen'>>();
  const styles = useStyles();
  return (
    <View style={styles.footerContainer}>
      <Button.Secondary
        text="products.cardRequest"
        fullWidth
        leftIcon={Plus}
        onPress={() =>
          navigate('CardDetailsScreen', {
            iban: 'GE04KS0000001360115733',
          })
        }
      />
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

const Cards: FC<CardsProps> = ({ cards, fromCardDetails, isCardAccount }) => {
  const styles = useStyles();
  const renderItem: ListRenderItem<CardType> = ({ item, index }) => {
    return <CardItem item={item} onPress={() => {}} isLast={index === cards.length - 1} />;
  };

  return (
    <View style={fromCardDetails ? styles.CardListWrapperWithoutBorder : styles.cardListWrapper}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={isCardAccount ? ListFooter : null}
        ListEmptyComponent={EmptyComponent}
      />
      <Divider marginTop={32} />
    </View>
  );
};

export default Cards;
