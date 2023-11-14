import React, { FC } from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Text } from '../index';
import { useStyles } from './LastTransactions.styles';
import LastTransactionItem from './LastTransactionItem';
import { LastTransactionsProps } from './LastTransaction.types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export const LastTransactions: FC<LastTransactionsProps> = ({
  data,
  sectionTitle = 'transfers.lastTransactions',
  headerContaienrStyle,
  headerLabelStyle,
  showFooter = true,
  style,
}) => {
  const styles = useStyles();

  const renderItem: ListRenderItem<TransactionType> = ({ item, index }) => {
    return <LastTransactionItem item={item} index={index} />;
  };

  const footer = () => {
    return (
      <Pressable style={styles.seeAll}>
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
