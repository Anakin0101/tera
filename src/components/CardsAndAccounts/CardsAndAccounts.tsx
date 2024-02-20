import React, { FC, useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks';
import { Account } from './Account';
import { Settings } from 'assets/SVGs';
import { Divider, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { ProductsStackScreenProps } from 'navigation/types';
import { ACCOUNT_DETAILS_SCREEN, ALL_ACCOUNTS_AND_CARDS_SCREEN } from 'navigation/ScreenNames';
import { CardsAndAccountsProps, HeaderProps, RenderItem } from './CardsAndAccounts.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { useStyles } from './CardsAndAccounts.styles';

const ListHeader: FC<HeaderProps> = ({ amount, showTitle, totalAvailableBalance }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  return (
    <View style={styles.headerWrapper}>
      {showTitle && (
        <View style={styles.headerContainer}>
          <Text
            title
            color={Colors.textBlack500}
            translateProp={{ value: amount }}
            children="products.accountsAndCards"
          />
          <View style={styles.iconContainer}>
            <Settings />
          </View>
        </View>
      )}
      <Text regular size={30} lineHeight={36} marginTop={!showTitle ? 24 : 0}>
        {formatMoney(totalAvailableBalance, CurrencyEnum.GEL)}
      </Text>
    </View>
  );
};

const ListFooter = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'AllAccountsAndCardsScreen'>>();

  const onPress = () => {
    navigate(ALL_ACCOUNTS_AND_CARDS_SCREEN);
  };

  return (
    <Pressable onPress={onPress} style={styles.seeAll}>
      <Text children="transfers.all" special size={14} lineHeight={20} />
    </Pressable>
  );
};

export const CardsAndAccounts: FC<CardsAndAccountsProps> = ({
  accounts = [],
  showTitle = true,
  showFooter = true,
  showDivider = false,
  totalAvailableBalance = 0,
  seeAllAccounts,
}) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'AccountDetailsScreen'>>();

  const handlePress = useCallback(
    (iban: string, index: number) => {
      navigate(ACCOUNT_DETAILS_SCREEN, {
        iban,
        index,
      });
    },
    [navigate],
  );

  const renderItem: RenderItem = useCallback(
    ({ item, index }) => (
      <Account
        item={item}
        isLast={index === accounts?.length - 1}
        handlePress={() => handlePress(item?.iban, index)}
      />
    ),
    [accounts?.length, handlePress],
  );

  if (!accounts?.length) {
    return <View />;
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={seeAllAccounts ? accounts : accounts?.slice(0, 3)}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeader
            amount={accounts.length}
            showTitle={showTitle}
            totalAvailableBalance={totalAvailableBalance}
          />
        }
        ListFooterComponent={showFooter ? ListFooter : null}
        style={styles.flatlist}
      />
      {showDivider && <Divider marginTop={24} marginBottom={12} />}
    </View>
  );
};
