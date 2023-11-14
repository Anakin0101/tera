import React, { FC } from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Text } from '../index';
import { useStyles } from './LastTransactions.styles';
import LastTransactionItem from './LastTransactionItem';
import { ILastTransaction, LastTransactionsProps } from './LastTransaction.types';

const dummyData = [
  {
    title: 'გივი დაუთაშვილი',
    value: 'GE07BS*****3232 GEL',
    amount: 320.5,
    date: '20 სექ, 2021, 12:20',
  },
  {
    title: 'თემო გაბეჩავა',
    value: 'GE07BS*****3232 GEL',
    amount: 410,
    date: '20 სექ, 2021, 12:20',
  },
  {
    title: 'ზურა ჭავჭანიძე',
    value: '01019052736',
    amount: 250,
    date: '20 სექ, 2021, 12:20',
  },
  {
    title: 'გივი დაუთაშვილი',
    value: '01019052736',
    amount: 25.7,
    date: '20 სექ, 2021, 12:20',
  },
];

export const LastTransactions: FC<LastTransactionsProps> = ({
  data = dummyData,
  sectionTitle = 'transfers.lastTransactions',
  headerContaienrStyle,
  headerLabelStyle,
  showFooter = true,
  style,
}) => {
  const styles = useStyles();

  const renderItem: ListRenderItem<ILastTransaction> = ({ item, index }) => {
    return <LastTransactionItem item={item} index={index} />;
  };

  const footer = () => {
    return (
      <Pressable style={styles.seeAll}>
        <Text children="transfers.all" special size={14} lineHeight={20} />
      </Pressable>
    );
  };

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
