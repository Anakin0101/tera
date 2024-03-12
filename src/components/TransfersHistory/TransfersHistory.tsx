import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { useStyles } from './TransfersHistory.styles';
import { Text } from 'components/Text/Text';
import { TransfersHistorytItem } from './TransfersHistoryItem';
import { TransfersHistoryProps } from './TransfersHistory.types';
import { TransferListTypeEnum, useTransfersHistoryServices } from './container';
import { MoneyTransferList } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { LoadingInView } from '../index';

export const TransfersHistory: React.FC<TransfersHistoryProps> = ({
  transferType = TransferListTypeEnum.receive,
}) => {
  const styles = useStyles();

  const { data, isLoading } = useTransfersHistoryServices(transferType);

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: MoneyTransferList; index: number }) => {
      return (
        <TransfersHistorytItem
          transferType={transferType}
          item={item}
          isLast={index + 1 === data?.length}
        />
      );
    },
    [data?.length, transferType],
  );

  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <LoadingInView />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle} children={'moneyTransfersScreen.transfersHistory'} />
      <FlatList
        data={data}
        renderItem={renderPaymentItem}
        showsVerticalScrollIndicator={false}
        style={styles.listWrapper}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};
