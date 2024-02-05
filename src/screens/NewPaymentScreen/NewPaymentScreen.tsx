import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChoosePaymentItem, LoadingView, SearchComponent, Text } from 'components/index';
import { useStyles } from './NewPaymentScreen.style';

import { useNewPayment } from './container';
import { ProvidersGroup } from 'services/apis/paymentsAPI/paymentsAPI.types';

export const NewPaymentScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { providersGroups, isLoading } = useNewPayment();

  const [searchText, setSearchText] = useState<string>('');

  const renderItem = useCallback(
    ({ item, index }: { item: ProvidersGroup; index: number }) => {
      return <ChoosePaymentItem isLast={index === providersGroups?.length - 1} item={item} />;
    },
    [providersGroups?.length],
  );

  const renderHeader = useCallback(() => {
    return (
      <View>
        <Text style={styles.headerTitle}>{t('newPayment.chooseService')}</Text>
      </View>
    );
  }, [styles.headerTitle, t]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <SearchComponent
        placeholder={t('newPayment.searchPlaceholder')}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={providersGroups}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listWrapper}
      />
    </View>
  );
};
