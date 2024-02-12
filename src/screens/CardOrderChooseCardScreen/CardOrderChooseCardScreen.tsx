import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Item } from './Item';
import { LoadingView, Text } from 'components';
import { useSelectCard } from './container';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './CardOrderChooseCardScreen.styles';

const ListHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <Text children="products.chooseCard" medium size={18} marginTop={24} />
    </View>
  );
};

export const CardOrderChooseCardScreen = () => {
  const styles = useStyles();
  const { offer } = useSelectCard();

  const renderItem: ListRenderItem<CardProduct> = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  if (!offer) {
    return <LoadingView />;
  }

  return (
    <FlatList
      data={offer.cardProducts}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
};
