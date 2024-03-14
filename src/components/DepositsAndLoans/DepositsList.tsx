import React, { FC, memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Footer } from './Footer';
import { Header } from './Header';
import { Divider } from '../index';
import { DepositItem } from './DepositItem';
import { DepositsListProps, RenderDepositItemType } from './DepositsAndLoans.types';
import { DEPOSITS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { useStyles } from './DepositsAndLoans.styles';
import { MainStackScreenProps } from 'navigation/types';
import { MAX_LIST_ITEM_AMOUNT } from 'constants/common';

export const DepositsList: FC<DepositsListProps> = memo(
  ({ data = [], totalAmount, seeAll = false, displayDivider }) => {
    const styles = useStyles();
    const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

    const isLast = useCallback(
      (index: number) => {
        return seeAll || data?.length < MAX_LIST_ITEM_AMOUNT
          ? index === data?.length - 1
          : index === MAX_LIST_ITEM_AMOUNT - 1;
      },
      [data?.length, seeAll],
    );

    const navigateToDeposits = useCallback(() => {
      navigate(MODAL_STACK, { screen: DEPOSITS_SCREEN });
    }, [navigate]);

    const renderItem: RenderDepositItemType = useCallback(
      ({ item, index }) => {
        return <DepositItem item={item} index={index} isLast={isLast(index)} />;
      },
      [isLast],
    );

    return (
      <View style={styles.listContainer}>
        <FlatList
          data={seeAll ? data : data?.slice(0, 3)}
          renderItem={renderItem}
          ListFooterComponent={!seeAll ? <Footer onPress={navigateToDeposits} /> : null}
          ListHeaderComponent={
            <Header
              title="products.deposits"
              seeAll={seeAll}
              totalAmount={totalAmount}
              quantity={data?.length}
            />
          }
          style={styles.list}
        />
        {displayDivider && <Divider marginTop={24} marginBottom={12} />}
      </View>
    );
  },
);
