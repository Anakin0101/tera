import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './PaymentsScreen.style';
import { CustomHeader } from 'components/CustomHeader';
import { useTranslation } from 'react-i18next';
import { Carts, ChoosePaymentsService, DebtInfo, RecentPayments } from 'components/index';

const data = [{ id: '0' }];
export const PaymentsScreen = () => {
  const { t } = useTranslation();

  const renderItem = useCallback(() => {
    return (
      <View>
        <DebtInfo />
        <ChoosePaymentsService />
        <Carts />
        <RecentPayments />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader title={t('common:navigation.payments')} />
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      />
    </View>
  );
};
