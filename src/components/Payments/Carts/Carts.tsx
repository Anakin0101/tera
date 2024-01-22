import React, { useCallback, useMemo } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Carts.styles';
import { Text } from 'components/Text/Text';
import { CartItem } from './CartItem';
import { CartListItemProps } from './Carts.types';
import { Button } from 'components/Button/Button';
import { Plus } from 'assets/SVGs';

export const Carts = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const choosePaymentsList: Array<CartListItemProps> = useMemo(
    () => [
      {
        id: '1',
        title: 'მიცკევიჩის სახლი',
        desc: '4 შაბლონი',
      },
      {
        id: '2',
        title: 'მიცკევიჩის სახლი',
        desc: '4 შაბლონი',
      },
      {
        id: '3',
        title: 'მიცკევიჩის სახლი',
        desc: '4 შაბლონი',
      },
      {
        id: '4',
        title: 'მიცკევიჩის სახლი',
        desc: '4 შაბლონი',
      },
    ],
    [],
  );

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: CartListItemProps; index: number }) => {
      return <CartItem item={item} isLast={index + 1 === choosePaymentsList.length} />;
    },
    [choosePaymentsList.length],
  );

  const renderFooter = useCallback(() => {
    return (
      <Button.Secondary
        fullWidth
        text={t('payments.all')}
        customWrapperStyle={styles.allButton}
        customTextStyle={styles.allButtonText}
        onPress={() => Alert.alert('ყველა')}
      />
    );
  }, [styles.allButton, t, styles.allButtonText]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerButtonsWrapper}>
        <Text style={styles.mainTitle}>{t('payments.carts')}</Text>
        <Pressable onPress={() => Alert.alert('დამატება')}>
          <View style={styles.addTemplateButton}>
            <Plus />
            <Text special children={t('transfers.add')} size={14} style={styles.addTemplateText} />
          </View>
        </Pressable>
      </View>
      <FlatList
        data={choosePaymentsList}
        renderItem={renderPaymentItem}
        showsHorizontalScrollIndicator={false}
        style={styles.listWrapper}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
