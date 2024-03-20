import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { ChevronUp, ChevronDown, Star, FullStar } from 'assets/SVGs';
import { AccountSliderItemProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { useRemoveFromFavouriteMutation, useSetAsFavouriteMutation } from 'services/apis';
import { useCulture } from 'hooks/useCulture';

const DEFAULT_CARD = require('assets/images/DefaultCard.png');

export const AccountSliderItem: FC<AccountSliderItemProps> = memo(
  ({ item, index: idx, activeCardIndex, setActiveAccountIndex = () => {} }) => {
    const { culture } = useCulture();
    const styles = useStyles();
    const [index, setIndex] = useState(0);
    const [setAsFavourite] = useSetAsFavouriteMutation();
    const [removeFromFavourite] = useRemoveFromFavouriteMutation();

    useEffect(() => {
      if (idx === activeCardIndex) {
        setActiveAccountIndex(index);
      }
    }, [activeCardIndex, idx, index, setActiveAccountIndex]);

    const imageId = useMemo(() => {
      const accWithCards = item?.accounts?.find(acc => !!acc?.cards?.length);
      if (accWithCards) {
        return accWithCards?.cards?.[0]?.cardLargeImageId;
      }
      return '';
    }, [item.accounts]);

    const getAmounts = useCallback(() => {
      return item?.accounts?.map((account, idx) => (
        <Pressable
          style={styles.currency}
          onPress={() => {
            setIndex(idx);
            setActiveAccountIndex?.(idx);
          }}
          key={idx}
        >
          <Text color={Colors.white} label size={11}>
            {formatMoney(account?.availableBalance, account?.ccy)}
          </Text>
        </Pressable>
      ));
    }, [item?.accounts, styles.currency, setActiveAccountIndex]);

    const onArrowUp = () => {
      setIndex(prev => (prev === 0 ? prev : prev - 1));
    };

    const onArrowDown = () => {
      setIndex(prev => (prev === item?.accounts?.length - 1 ? prev : prev + 1));
    };

    const handleFavourite = () => {
      const config = {
        culture,
        accountId: item?.accounts?.[index]?.accountId,
      };

      item?.accounts?.[index]?.isFavourite ? removeFromFavourite(config) : setAsFavourite(config);
    };

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
              children={item?.accounts?.[index]?.accountName}
              color={Colors.white}
            />
            <View style={styles.balance}>
              <Text size={30} lineHeight={36} marginTop={5} color={Colors.white}>
                {formatMoney(item?.accounts?.[index]?.balance, item?.accounts?.[index]?.ccy)}
              </Text>
              {item?.accounts?.length > 1 && (
                <View style={styles.arrowContainer}>
                  <Pressable onPress={onArrowUp}>
                    <ChevronUp color={!index ? Colors.textWhite500 : Colors.textWhite} />
                  </Pressable>
                  <Pressable onPress={onArrowDown}>
                    <ChevronDown
                      color={
                        index === item?.accounts?.length - 1
                          ? Colors.textWhite500
                          : Colors.textWhite
                      }
                    />
                  </Pressable>
                </View>
              )}
            </View>
          </View>
          <View style={styles.currencies}>{getAmounts()}</View>
          <Pressable style={styles.starContainer} onPress={handleFavourite}>
            {item?.accounts?.[index]?.isFavourite ? <FullStar /> : <Star />}
          </Pressable>
        </View>
      </ImageBackground>
    );
  },
);
