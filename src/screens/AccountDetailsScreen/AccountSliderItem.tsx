import React, { FC, useMemo, useState } from 'react';
import { ImageBackground, Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { ChevronUp, ChevronDown, Star, FullStar } from 'assets/SVGs';
import { AccountSliderItemProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { PUBLIC_IMAGE_URL } from 'services/api';

const DEFAULT_CARD = require('assets/images/DefaultCard.png');

export const AccountSliderItem: FC<AccountSliderItemProps> = ({ item }) => {
  const styles = useStyles();
  const [index, setIndex] = useState(0);

  const imageId = useMemo(() => {
    const accWithCards = item.accounts?.find(acc => !!acc?.cards?.length);
    if (accWithCards) {
      return accWithCards?.cards?.[0].cardLargeImageId;
    }
  }, [item.accounts]);

  return (
    <ImageBackground
      source={imageId ? { uri: `${PUBLIC_IMAGE_URL}${imageId}` } : DEFAULT_CARD}
      resizeMode="contain"
    >
      <View style={styles.card}>
        <View style={styles.content}>
          <Text
            title
            regular
            center
            children={item.accounts[index].accountName}
            color={Colors.white}
          />
          <View style={styles.balance}>
            <Text size={30} lineHeight={36} marginTop={5} color={Colors.white}>
              {formatMoney(item.accounts[index].balance)}{' '}
              {CurrencySignMap[item.accounts[index].ccy]}
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
        <View style={styles.currencies}>
          {item.accounts.map((account, idx) => {
            return (
              <Pressable style={styles.currency} onPress={() => setIndex(idx)} key={idx}>
                <Text color={Colors.white} label size={11}>
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
    </ImageBackground>
  );
};
