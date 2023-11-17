import React, { FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { ChevronUp, ChevronDown, Star, FullStar } from 'assets/SVGs';
import { CardSliderItemProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { CurrencySignMap } from 'utils/CurrencySignMap';

export const CardSliderItem: FC<CardSliderItemProps> = ({ item, iban }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'MyAccountScrollableScreen'>>();
  const [index, setIndex] = useState(0);

  if (!iban) {
    return null;
  }

  const handlePress = () => {
    // navigate('MyAccountScrollableScreen', { iban });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
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
            <Pressable style={styles.currency} onPress={() => setIndex(idx)}>
              <Text color={Colors.textWhite500} label size={11}>
                {formatMoney(account.availableBalance)} {CurrencySignMap[account.ccy]}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.startContainer}>
        {item.accounts[index].isFavourite ? <FullStar /> : <Star />}
      </Pressable>
    </Pressable>
  );
};
