import React, { useCallback } from 'react';
import { FlatList, Image, ListRenderItem, View } from 'react-native';
import { Item } from './Item';
import { LoadingView, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useSelectDeposit } from './container';
import { OfferType } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './SelectDepositScreen.styles';

const ICON = require('assets/images/Deposit.png');

const ListHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <Image source={ICON} style={styles.icon} />
      </View>
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
  const { offers } = useSelectDeposit();

  const renderItem: ListRenderItem<OfferType> = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  if (!offers) {
    return <LoadingView />;
  }

  return (
    <FlatList
      data={offers}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
};
