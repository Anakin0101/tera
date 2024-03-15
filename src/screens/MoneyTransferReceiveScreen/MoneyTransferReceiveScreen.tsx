import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChooseTransferItem, LoadingView, SearchComponent, Text } from 'components/index';
import { useStyles } from './MoneyTransferReceiveScreen.style';

import { useMoneyTransferReceive } from './container';
import { MTSystemItemProps } from 'utils/moneyTransfer';

export const MoneyTransferReceiveScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { mtSystemArray, isLoading } = useMoneyTransferReceive();

  const [searchText, setSearchText] = useState<string>('');

  const renderItem = useCallback(
    ({ item, index }: { item: MTSystemItemProps; index: number }) => {
      return <ChooseTransferItem isLast={index === mtSystemArray?.length - 1} item={item} />;
    },
    [mtSystemArray?.length],
  );

  const filteredMtSystemArray = useMemo(() => {
    return mtSystemArray.filter(item =>
      item?.key?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [mtSystemArray, searchText]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle} children={'moneyTransferReceiveScreen.chooseProvider'} />
        <SearchComponent
          placeholder={t('moneyTransferReceiveScreen.searchProvider')}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredMtSystemArray}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.listWrapper}
      />
    </View>
  );
};
