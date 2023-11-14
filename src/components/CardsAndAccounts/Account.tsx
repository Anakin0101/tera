import React, { FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from '../index';
// import { Alert } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { useStyles } from './CardsAndAccounts.styles';
import { AccountProps, CurrencyMap } from './CardsAndAccounts.types';
import { useTheme } from 'hooks';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencySignMap } from 'utils/CurrencySignMap';

const currencies: CurrencyMap[] = [
  {
    cur: 'GEL',
    sign: '₾',
  },
  {
    cur: 'USD',
    sign: '$',
  },
  {
    cur: 'EUR',
    sign: '€',
  },
  {
    cur: 'GBP',
    sign: '£',
  },
];

export const Account: FC<AccountProps> = ({ item, isLast, handlePress }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(item.accounts[0].ccy);

  const currency = item.accounts?.find(account => account.ccy === selectedCurrency);

  const handleCurrencyPress = (selectedCur: Currency) => {
    setSelectedCurrency(selectedCur);
  };

  if (!currency) {
    return null;
  }

  return (
    <Pressable onPress={handlePress} style={styles.account}>
      <View style={styles.cardContainer}>
        <View style={styles.card} />
      </View>
      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text regular children={item.accountName} size={14} color={Colors.textBlack500} />
          {/* {item.isBlocked && <Alert />} */}
        </View>
        <View style={styles.balanceContainer}>
          <Text size={16} demiBold>
            {formatMoney(currency?.balance || 0)} {CurrencySignMap[currency.ccy]}
          </Text>
          <View style={styles.currencyWrapper}>
            {currencies.map(({ cur, sign }) => {
              const x = item?.accounts?.findIndex(acc => acc.ccy === cur);
              if (x === -1) {
                return null;
              }
              return (
                <Pressable
                  style={styles.currencySignContainer}
                  onPress={() => handleCurrencyPress(cur)}
                >
                  <Text
                    label
                    color={selectedCurrency === cur ? Colors.textBlack : Colors.textBlack400}
                  >
                    {sign}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        {!isLast && <Divider height={1} marginTop={18} width="100%" />}
      </View>
    </Pressable>
  );
};
