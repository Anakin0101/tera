import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './RecentPayments.styles';
import { Text } from 'components/Text/Text';
import { RecentPaymentItem } from './RecentPaymentItem';
import { RecentPaymentListItemProps } from './RecentPayments.types';

export const RecentPayments = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const choosePaymentsList: Array<RecentPaymentListItemProps> = useMemo(
    () => [
      {
        id: '1',
        title: 'ინტერნეტი/TV/ტელეფონი',
        desc: 'დაუთაშვილი გივი',
        value: '320.22',
        date: '20 სექ, 2021, 12:20',
      },
      {
        id: '2',
        title: 'განათლება',
        desc: 'დაუთაშვილი გივი',
        value: '320.22',
        date: '20 სექ, 2021, 12:20',
      },
    ],
    [],
  );

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: RecentPaymentListItemProps; index: number }) => {
      return <RecentPaymentItem item={item} isLast={index + 1 === choosePaymentsList.length} />;
    },
    [choosePaymentsList.length],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle}>{t('payments.recentPayments')}</Text>
      <FlatList
        data={choosePaymentsList}
        renderItem={renderPaymentItem}
        showsHorizontalScrollIndicator={false}
        style={styles.listWrapper}
      />
    </View>
  );
};
