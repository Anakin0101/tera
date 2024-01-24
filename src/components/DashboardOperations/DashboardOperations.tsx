import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks';
import { Button, Text } from 'components';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import { DashboardOperationsProps, RenderItem } from './DashboardOperations.types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';
import { MainStackScreenProps } from 'navigation/types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './DashboardOperations.styles';

export const DashboardOperations: FC<DashboardOperationsProps> = ({ data }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const { navigate } = useNavigation<MainStackScreenProps<'AllTransactionsScreen'>>();
  const dispatch = useAppDispatch();
  const handlePress = () => {
    navigate('AllTransactionsScreen');
  };

  const onOperationPress = (item: TransactionType) => {
    dispatch(setSelectedTransaction(item));
    navigate('TransactionDetailsScreen');
  };

  const renderItem: RenderItem = ({ item, index }) => {
    return (
      <LastTransactionItem
        item={item}
        onPress={() => onOperationPress(item)}
        showUnderline={data && index < data.length - 1}
      />
    );
  };

  return (
    <>
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
              {data && data.length ? (
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View style={styles.noTransactionsWrapper}>
                  <Text children="dashboard.noTransactions" style={styles.noTransactionsText} />
                </View>
              )}
            </View>
          </View>
        </View>
        {data && data.length ? (
          <Button.Outline fixedWidth text="dashboard.all" onPress={handlePress} />
        ) : null}
      </View>
    </>
  );
};
