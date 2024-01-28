import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Item } from './Item';
import { AddNewPayment } from './AddNewPayment';
import { EmptyComponent } from './EmptyComponent';
import { useAutomaticPayments } from './container';
import { RenderItem } from './AutomaticPaymentsScreen.types';
import { useStyles } from './AutomaticPaymentsScreen.styles';

const data = [
  {
    id: '1',
    title: 'დენი',
    user: 'დაუთაშვილი გივი',
    amount: 120,
    number: 12345,
  },
];

export const AutomaticPaymentsScreen = () => {
  const styles = useStyles();
  const { handleItemPress } = useAutomaticPayments();

  const renderItem: RenderItem = useCallback(
    ({ item }) => {
      return <Item item={item} onPress={handleItemPress} />;
    },
    [handleItemPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={EmptyComponent}
        ListFooterComponentStyle={styles.footer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={data.length ? AddNewPayment : null}
      />
    </View>
  );
};
