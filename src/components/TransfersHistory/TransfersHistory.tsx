import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

import { useStyles } from './TransfersHistory.styles';
import { Text } from 'components/Text/Text';
import { TransfersHistorytItem } from './TransfersHistoryItem';
import { TransfersHistoryListItemProps } from './TransfersHistory.types';

export const TransfersHistory = () => {
  const styles = useStyles();

  const transfersList: Array<TransfersHistoryListItemProps> = useMemo(
    () => [
      {
        id: '1',
        title: 'დაუთაშვილი გივი',
        desc: 'კონტაქტი',
        value: '320.22',
        date: '20 სექ, 2021, 12:20',
      },
      {
        id: '2',
        title: 'დაუთაშვილი გივი',
        desc: 'კონტაქტი',
        value: '320.22',
        date: '20 სექ, 2021, 12:20',
      },
    ],
    [],
  );

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: TransfersHistoryListItemProps; index: number }) => {
      return <TransfersHistorytItem item={item} isLast={index + 1 === transfersList.length} />;
    },
    [transfersList.length],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle} children={'moneyTransfersScreen.transfersHistory'} />
      <FlatList
        data={transfersList}
        renderItem={renderPaymentItem}
        showsHorizontalScrollIndicator={false}
        style={styles.listWrapper}
      />
    </View>
  );
};
