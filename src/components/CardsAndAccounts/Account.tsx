import React, { FC, useCallback, useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Divider, IconComponent, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { useTheme } from 'hooks';
import { AccountProps, CurrencyMap } from './CardsAndAccounts.types';
import { useStyles } from './CardsAndAccounts.styles';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

const currencies: CurrencyMap[] = [
  {
    cur: CurrencyEnum.GEL,
    sign: '₾',
  },
  {
    cur: CurrencyEnum.USD,
    sign: '$',
  },
  {
    cur: CurrencyEnum.EUR,
    sign: '€',
  },
  {
    cur: CurrencyEnum.GBP,
    sign: '£',
  },
];

const DEFAULT_CARD = require('assets/images/DefaultCard.png');

export const Account: FC<AccountProps> = ({ item, isLast, handlePress }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(item?.accounts?.[0]?.ccy);

  const currency = useMemo(() => {
    return item?.accounts?.find(account => account?.ccy === selectedCurrency);
  }, [item?.accounts, selectedCurrency]);

  const imageId = useMemo(() => {
    if (item?.cards.length) {
      return item?.cards?.[0]?.cardLargeImageId;
    }
    return '';
  }, [item?.cards]);

  const renderIcon = useCallback(() => {
    if (imageId) {
      return <IconComponent imageId={imageId} customImageIDStyle={styles.card} />;
    }
    return <Image source={DEFAULT_CARD} style={styles.card} />;
  }, [imageId, styles.card]);

  const handleCurrencyPress = (selectedCur: CurrencyEnum) => {
    setSelectedCurrency(selectedCur);
  };

  const getCurrencies = useCallback(() => {
    return currencies?.map(({ cur, sign }) => {
      const index = item?.accounts?.findIndex(acc => acc?.ccy === cur);
      if (index === -1) {
        return null;
      }
      return (
        <Pressable
          style={styles.currencySignContainer}
          onPress={() => handleCurrencyPress(cur)}
          key={cur}
        >
          <Text label color={selectedCurrency === cur ? Colors.textBlack : Colors.textBlack400}>
            {sign}
          </Text>
        </Pressable>
      );
    });
  }, [
    selectedCurrency,
    item?.accounts,
    Colors.textBlack,
    Colors.textBlack400,
    styles.currencySignContainer,
  ]);

  return (
    <Pressable onPress={handlePress} style={styles.account}>
      <View style={styles.cardContainer}>{renderIcon()}</View>
      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text regular children={item.accountName} size={14} color={Colors.textBlack500} />
        </View>
        <View style={styles.balanceContainer}>
          <Text size={16} demiBold>
            {formatMoney(currency?.balance, currency?.ccy)}
          </Text>
          <View style={styles.currencyWrapper}>{getCurrencies()}</View>
        </View>
        {!isLast && <Divider height={1} marginTop={18} width="100%" />}
      </View>
    </Pressable>
  );
};
