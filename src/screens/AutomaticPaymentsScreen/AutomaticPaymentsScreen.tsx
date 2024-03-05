import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Item } from './Item';
import { AddNewPayment } from './AddNewPayment';
import { EmptyComponent } from './EmptyComponent';
import { useAutomaticPayments } from './container';
import { RenderItem } from './AutomaticPaymentsScreen.types';
import { useStyles } from './AutomaticPaymentsScreen.styles';
import { LoadingInView } from 'components';

export const AutomaticPaymentsScreen = () => {
  const styles = useStyles();
  const { handleItemPress, automaticPayments, isLoading, selectedAccountFromCard } =
    useAutomaticPayments();

  const renderItem: RenderItem = useCallback(
    ({ item }) => <Item item={item} onPress={handleItemPress} />,
    [handleItemPress],
  );

  if (isLoading) {
    return <LoadingInView />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={automaticPayments}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyComponent>
            <AddNewPayment selectedAccountFromCard={selectedAccountFromCard} />
          </EmptyComponent>
        }
        ListFooterComponentStyle={styles.footer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={automaticPayments?.length ? AddNewPayment : null}
      />
    </View>
  );
};
