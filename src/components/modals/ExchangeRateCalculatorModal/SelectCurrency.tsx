import React, { FC, memo, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Collapsible, IconComponent, Text } from 'components';
import { useStyles } from './ExchangeRateCalculatorModal.styles';
import { getExchangeIcon } from 'screens/ExchangeRatesScreen/ListItem';
import { RenderItem, SelectCurrencyProps } from './ExchangeRateCalculatorModal.types';
import { CurrencyItem } from './CurrencyItem';

export const SelectCurrency: FC<SelectCurrencyProps> = memo(
  ({ currency, setCurrency, currencies = [] }) => {
    const styles = useStyles();

    const renderItem: RenderItem = useCallback(
      ({ item }) => <CurrencyItem item={item} setCurrency={setCurrency} currency={currency} />,
      [currency, setCurrency],
    );

    return (
      <View style={styles.collapsibleWrapper}>
        <Collapsible
          headerHeight={40}
          contentHeight={115}
          renderHeader={
            <View style={styles.selectCurrency}>
              <IconComponent
                pngLocalIcon={getExchangeIcon(currency)}
                pngLocalIconCustomStyle={styles.icon}
                customIconComponentStyles={styles.iconContainer}
              />
              <Text children={currency} />
            </View>
          }
          renderContent={<FlatList numColumns={2} data={currencies} renderItem={renderItem} />}
          headerWrapperStyle={styles.headerWrapper}
          iconContainerStyle={styles.headerIcon}
          contentContainerStyle={styles.collapsibleContent}
        />
      </View>
    );
  },
);
