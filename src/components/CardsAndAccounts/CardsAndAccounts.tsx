import React, { FC } from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { useTheme } from 'hooks';
import { Account } from './Account';
import { Divider, Text } from '../index';
import { Settings } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import {
  CardsAndAccountsProps,
  HeaderProps,
  IGroupedAccountsByIban,
} from './CardsAndAccounts.types';
import { useStyles } from './CardsAndAccounts.styles';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';

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
        {formatMoney(totalAvailableBalance)} ₾
      </Text>
    </View>
  );
};

const ListFooter = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'AllAccountsAndCardsScreen'>>();

  const onPress = () => {
    navigate('AllAccountsAndCardsScreen');
  };

  return (
    <Pressable onPress={onPress} style={styles.seeAll}>
      <Text children="transfers.all" special size={14} lineHeight={20} />
    </Pressable>
  );
};

export const CardsAndAccounts: FC<CardsAndAccountsProps> = ({
  accounts,
  showTitle = true,
  showFooter = true,
  showDivider = false,
  totalAvailableBalance = 0,
  seeAllAccounts,
}) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'AccountDetailsScreen'>>();

  const handlePress = (iban: string) => {
    navigate('AccountDetailsScreen', {
      iban,
    });
  };

  if (!accounts) {
    return null;
  }

  const renderItem: ListRenderItem<IGroupedAccountsByIban> = ({ item, index }) => {
    return (
      <Account
        item={item}
        isLast={index === accounts.length - 1}
        handlePress={() => handlePress(item.iban)}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={seeAllAccounts ? accounts : accounts.slice(0, 3)}
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
