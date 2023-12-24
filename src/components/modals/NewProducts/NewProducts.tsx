import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Item, NewProductsProps } from './NewProducts.types';
import { useStyles } from './NewProducts.styles';
import { NewProductItem } from './Item';

export const NewProducts: FC<NewProductsProps> = ({ products }) => {
  const styles = useStyles();

  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item, index }) => {
      return <NewProductItem item={item} showUnderline={index !== products.length - 1} />;
    },
    [products.length],
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.title}
      style={styles.wrapper}
    />
  );
};
