import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Item } from './Item';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { useSelectDeposit } from './container';
import { ListItem } from './SelectDepositScreen.types';
import { useStyles } from './SelectDepositScreen.styles';

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

export const SelectDepositScreen = () => {
  const styles = useStyles();
  const { depositTypes } = useSelectDeposit();

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
