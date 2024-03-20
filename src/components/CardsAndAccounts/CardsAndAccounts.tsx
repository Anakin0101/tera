import React, { FC, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Account } from './Account';
import { Divider } from '../index';
import { MainStackScreenProps } from 'navigation/types';
import { ACCOUNT_DETAILS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { CardsAndAccountsProps, RenderItem } from './CardsAndAccounts.types';
import { useStyles } from './CardsAndAccounts.styles';
import { MAX_LIST_ITEM_AMOUNT } from 'constants/common';
import { ListFooter } from './Footer';
import { ListHeader } from './Header';

export const CardsAndAccounts: FC<CardsAndAccountsProps> = ({
  accounts = [],
  showTitle = true,
  showFooter = true,
  showDivider = false,
  groupedUserBalance = 0,
  seeAllAccounts,
}) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handlePress = useCallback(
    (iban: string, index: number) => {
      navigate(MODAL_STACK, {
        screen: ACCOUNT_DETAILS_SCREEN,
        params: { iban, index },
      });
    },
    [navigate],
  );

  const isLast = useCallback(
    (index: number) => {
      return seeAllAccounts || accounts?.length < MAX_LIST_ITEM_AMOUNT
        ? index === accounts?.length - 1
        : index === MAX_LIST_ITEM_AMOUNT - 1;
    },
    [accounts?.length, seeAllAccounts],
  );

  const renderItem: RenderItem = useCallback(
    ({ item, index }) => (
      <Account
        item={item}
        isLast={isLast(index)}
        handlePress={() => handlePress(item?.iban, index)}
      />
    ),
    [handlePress, isLast],
  );

  if (!accounts?.length) {
    return <></>;
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={seeAllAccounts ? accounts : accounts?.slice(0, 3)}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeader
            amount={accounts?.length}
            showTitle={showTitle}
            groupedUserBalance={groupedUserBalance}
          />
        }
        ListFooterComponent={
          <ListFooter groupedUserBalance={groupedUserBalance} showFooter={showFooter} />
        }
        style={styles.flatlist}
      />
      {showDivider && <Divider marginTop={24} marginBottom={12} />}
    </View>
  );
};
