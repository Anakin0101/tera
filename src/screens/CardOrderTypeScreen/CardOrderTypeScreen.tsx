import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Item } from './Item';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './CardOrderTypeScreen.styles';

const ICON = require('assets/images/Card.png');

const plasticCardDetails = {
  title: 'products.plasticCard',
  subtitle: 'products.orderPlasticCard',
  image: ICON,
};

const ListHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <Image source={ICON} style={styles.icon} />
      </View>
      <Text children="products.getCardEasily" medium size={16} marginTop={24} />
      <Text
        center
        marginTop={14}
        children="products.tailoredProducts"
        color={Colors.textBlack500}
      />
    </View>
  );
};

export const CardOrderTypeScreen = () => {
  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <ListHeader />
      <Item item={plasticCardDetails} />
    </ScrollView>
  );
};
