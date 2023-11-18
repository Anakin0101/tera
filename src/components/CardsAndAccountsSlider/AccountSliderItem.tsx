import React, { FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { ChevronUp, ChevronDown, Star, FullStar } from 'assets/SVGs';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { AccountSliderItemProps } from './CardsAndAccountsSlider.types';
import { useStyles } from './CardsAndAccountsSlider.styles';

export const AccountSliderItem: FC<AccountSliderItemProps> = ({ item, iban }) => {
  const styles = useStyles();
  const [index, setIndex] = useState(0);

  if (!iban) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View>
        <Text
          title
          regular
          children={item.accounts[index].accountName}
          color={Colors.inactiveTint}
        />
        <View style={styles.balance}>
          <Text size={30} lineHeight={36} marginTop={10} color={Colors.white}>
            {formatMoney(item.accounts[index].balance)} {CurrencySignMap[item.accounts[index].ccy]}
          </Text>
          {item.accounts.length > 1 && (
            <View style={styles.arrowContainer}>
              <Pressable onPress={() => setIndex(prev => (prev === 0 ? prev : prev - 1))}>
                <ChevronUp color={!index ? Colors.textWhite500 : Colors.textWhite} />
              </Pressable>
              <Pressable
                onPress={() =>
                  setIndex(prev => (prev === item.accounts.length - 1 ? prev : prev + 1))
                }
              >
                <ChevronDown
                  color={
                    index === item.accounts.length - 1 ? Colors.textWhite500 : Colors.textWhite
                  }
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      {/* <View style={styles.blockMessage}>
          <Alert color={Colors.white} />
          <Text
            label
            children={'products.accountBlocked'}
            color={Colors.white}
          />
        </View> */}
      <View style={styles.currencies}>
        {item.accounts.map((account, idx) => {
          return (
            <Pressable style={styles.currency} onPress={() => setIndex(idx)} key={idx}>
              <Text color={Colors.textWhite500} label size={11}>
                {formatMoney(account.availableBalance)} {CurrencySignMap[account.ccy]}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.starContainer}>
        {item.accounts[index].isFavourite ? <FullStar /> : <Star />}
      </Pressable>
    </View>
  );
};
