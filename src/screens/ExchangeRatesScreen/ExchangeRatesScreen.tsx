import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Button, LoadingInView, Text } from 'components';
import { useStyles } from './ExchangeRatesScreen.styles';
import { RenderItem } from './ExchangeRatesScreen.types';
import { useExchangeRates } from './container';
import { ListItem } from './ListItem';

export const ExchangeRatesScreen = () => {
  const styles = useStyles();
  const { isRatesLoading, groupedRates } = useExchangeRates();

  const renderItem: RenderItem = useCallback(({ item }) => <ListItem item={item} />, []);

  if (isRatesLoading) {
    return <LoadingInView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fill} children="exchange.official" />
        <Text style={styles.fill} children="exchange.tera" />
      </View>
      <FlatList data={groupedRates} renderItem={renderItem} style={styles.list} />
      <View style={styles.buttonContainer}>
        <Button.Primary fullWidth text="exchange.calculator" customWrapperStyle={styles.button} />
      </View>
    </View>
  );
};
