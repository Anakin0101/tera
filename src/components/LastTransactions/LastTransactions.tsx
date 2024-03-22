import React, { FC, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '../index';
import { Footer } from './Footer';
import LastTransactionItem from './LastTransactionItem';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';
import {
  ALL_TRANSACTIONS_SCREEN,
  MODAL_STACK,
  TRANSACTION_DETAILS_SCREEN,
} from 'navigation/ScreenNames';
import { LastTransactionsProps, RenderItem } from './LastTransaction.types';
import { useStyles } from './LastTransactions.styles';
import { TransactionItem } from 'screens/AllTransactionsScreen/AllTransactionsScreen.types';
import { isTransactionType } from 'utils/transactionUtils/isTransactionType';

export const LastTransactions: FC<LastTransactionsProps> = ({
  data,
  sectionTitle = 'transfers.lastTransactions',
  headerContaienrStyle,
  headerLabelStyle,
  showFooter = true,
  accountNumber,
  style,
}) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const pressHandler = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: ALL_TRANSACTIONS_SCREEN,
      params: { accountNumber },
    });
  }, [accountNumber, navigate]);

  //   only navigate to transaction details, if no blocked transactions
  const onTransactionPress = useCallback(
    (item: TransactionItem) => {
      if (isTransactionType(item)) {
        dispatch(setSelectedTransaction(item));
        navigate(MODAL_STACK, {
          screen: TRANSACTION_DETAILS_SCREEN,
        });
      }
    },
    [dispatch, navigate],
  );

  const renderItem: RenderItem = useCallback(
    ({ item }) => <LastTransactionItem item={item} onPress={onTransactionPress} />,
    [onTransactionPress],
  );

  if (!data?.length) {
    return <View />;
  }

  return (
    <View>
      <View style={[styles.header, headerContaienrStyle]}>
        <Text children={sectionTitle} style={headerLabelStyle} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={<Footer onPress={pressHandler} showFooter={showFooter} />}
        style={[styles.list, style]}
      />
    </View>
  );
};
