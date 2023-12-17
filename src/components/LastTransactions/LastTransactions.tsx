import React, { FC } from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Text } from '../index';
import { useStyles } from './LastTransactions.styles';
import LastTransactionItem from './LastTransactionItem';
import { LastTransactionsProps } from './LastTransaction.types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';

export const LastTransactions: FC<LastTransactionsProps> = ({
  data,
  sectionTitle = 'transfers.lastTransactions',
  headerContaienrStyle,
  headerLabelStyle,
  showFooter = true,
  style,
}) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'AllTransactionsScreen'>>();

  const pressHandler = () => {
    navigate('AllTransactionsScreen');
  };

  const onTransactionPress = () => {
    navigate('TransactionDetailsScreen');
  };

  const renderItem: ListRenderItem<TransactionType> = ({ item }) => {
    return <LastTransactionItem item={item} onPress={onTransactionPress} />;
  };

  const footer = () => {
    return (
      <Pressable style={styles.seeAll} onPress={pressHandler}>
        <Text children="transfers.all" special size={14} lineHeight={20} />
      </Pressable>
    );
  };

  if (!data?.length) {
    return null;
  }

  return (
    <>
      <View style={[styles.header, headerContaienrStyle]}>
        <Text children={sectionTitle} style={headerLabelStyle} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={showFooter ? footer : null}
        style={[styles.list, style]}
      />
    </>
  );
};
