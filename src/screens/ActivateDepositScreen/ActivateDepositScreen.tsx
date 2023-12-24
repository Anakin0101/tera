import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Item } from './Item';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { useActivateDeposit } from './container';
import { ListItem } from './ActivateDepositScreen.types';
import { useStyles } from './ActivateDepositScreen.styles';

const ListHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer} />
      <Text children="newDeposit.saveMoney" medium size={16} marginTop={24} />
      <Text
        center
        marginTop={14}
        children="newDeposit.openDepositOffer"
        color={Colors.textBlack500}
      />
    </View>
  );
};

export const ActivateDepositScreen = () => {
  const styles = useStyles();
  const { depositTypes } = useActivateDeposit();

  const renderItem: ListRenderItem<ListItem> = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  return (
    <FlatList
      data={depositTypes}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
};
