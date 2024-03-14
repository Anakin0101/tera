import React, { FC, memo, useCallback, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from './Header';
import { Footer } from './Footer';
import { Divider } from '../index';
import { LoanItem } from './LoanItem';
import { LOANS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { LoansListProps, RenderLoanItemType } from './DepositsAndLoans.types';
import { MainStackScreenProps } from 'navigation/types';
import { useStyles } from './DepositsAndLoans.styles';
import { MAX_CREDIT_DISBURSEMENTS_AMOUNT, MAX_LIST_ITEM_AMOUNT } from 'constants/common';

export const LoansList: FC<LoansListProps> = memo(
  ({ data = [], totalAmount, seeAll = false, displayDivider, creditDisbursements = [] }) => {
    const styles = useStyles();
    const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

    const navigateToLoans = useCallback(() => {
      navigate(MODAL_STACK, { screen: LOANS_SCREEN });
    }, [navigate]);

    const loanSlice = useMemo(() => {
      if (data?.length > MAX_LIST_ITEM_AMOUNT) {
        const loans = data?.slice(0, MAX_LIST_ITEM_AMOUNT);
        const disbursements = creditDisbursements?.slice(0, MAX_CREDIT_DISBURSEMENTS_AMOUNT);
        return [...loans, ...disbursements];
      }
      return data;
    }, [creditDisbursements, data]);

    const isLast = useCallback(
      (index: number) => {
        if (seeAll || data?.length - creditDisbursements?.length < MAX_LIST_ITEM_AMOUNT) {
          return index === data?.length - creditDisbursements?.length - 1;
        }

        if (data?.length - creditDisbursements?.length >= MAX_LIST_ITEM_AMOUNT) {
          return index === MAX_LIST_ITEM_AMOUNT - 1;
        }

        return false;
      },
      [creditDisbursements?.length, data?.length, seeAll],
    );

    const renderItem: RenderLoanItemType = useCallback(
      ({ item, index }) => <LoanItem item={item} index={index} isLast={isLast(index)} />,
      [isLast],
    );

    return (
      <View style={styles.listContainer}>
        <FlatList
          data={seeAll ? data : loanSlice}
          renderItem={renderItem}
          ListFooterComponent={!seeAll ? <Footer onPress={navigateToLoans} /> : null}
          ListHeaderComponent={
            <Header
              seeAll={seeAll}
              totalAmount={totalAmount}
              quantity={data.length}
              title="products.loans"
            />
          }
          style={styles.list}
        />
        {displayDivider && <Divider marginTop={24} marginBottom={12} />}
      </View>
    );
  },
);
