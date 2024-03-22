import React, { FC, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks';
import { Button, Text } from 'components';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import {
  MODAL_STACK,
  ALL_TRANSACTIONS_SCREEN,
  TRANSACTION_DETAILS_SCREEN,
} from 'navigation/ScreenNames';
import { NoTransactions } from 'assets/SVGs';
import { DashboardOperationsProps, RenderItem } from './DashboardOperations.types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';
import { MainStackScreenProps } from 'navigation/types';
import { useStyles } from './DashboardOperations.styles';

export const DashboardOperations: FC<DashboardOperationsProps> = ({ data }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: ALL_TRANSACTIONS_SCREEN,
    });
  }, [navigate]);

  const onOperationPress = useCallback(
    (item: TransactionType) => {
      dispatch(setSelectedTransaction(item));
      navigate(MODAL_STACK, {
        screen: TRANSACTION_DETAILS_SCREEN,
      });
    },
    [dispatch, navigate],
  );

  const renderItem: RenderItem = useCallback(
    ({ item, index }) => {
      return (
        <LastTransactionItem
          item={item}
          onPress={onOperationPress}
          showUnderline={data && index < data.length - 1}
        />
      );
    },
    [data, onOperationPress],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.dashboardView}>
        <View style={styles.dashboardTemplatesContainer}>
          <View style={styles.headerContainer}>
            <Text
              children={'dashboard.transactions'}
              style={styles.titleContainer}
              color={Colors.textBlack}
            />
          </View>
          <View style={styles.dashboardTemplatesWrapper}>
            {data?.length ? (
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <View style={styles.noTransactionsWrapper}>
                <NoTransactions />
                <Text children="dashboard.noTransactions" style={styles.noTransactionsText} />
              </View>
            )}
          </View>
        </View>
      </View>
      {data && data.length > 0 && (
        <Button.Outline fixedWidth text="dashboard.all" onPress={handlePress} />
      )}
    </View>
  );
};
