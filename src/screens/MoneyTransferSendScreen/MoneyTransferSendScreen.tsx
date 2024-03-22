import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { ChooseTransferItem, LoadingView, Text } from 'components/index';
import { useStyles } from './MoneyTransferSendScreen.style';

import { useMoneyTransferSend } from './container';
import { MTSystemItemProps } from 'utils/moneyTransfer';

export const MoneyTransferSendScreen = () => {
  const styles = useStyles();

  const { mtSystemArray, isLoading } = useMoneyTransferSend();

  const renderItem = useCallback(
    ({ item, index }: { item: MTSystemItemProps; index: number }) => {
      return (
        <ChooseTransferItem
          isLast={index === mtSystemArray?.length - 1}
          item={item}
          isSendMode={true}
        />
      );
    },
    [mtSystemArray?.length],
  );

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle} children={'moneyTransferSendScreen.desc'} />
      </View>
      <FlatList
        data={mtSystemArray}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.listWrapper}
      />
    </View>
  );
};
