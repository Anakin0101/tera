import React, { useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Carts.styles';
import { Text } from 'components/Text/Text';
import { CartItem } from '../CartItem/CartItem';
import { Button } from 'components/Button/Button';
import { Plus } from 'assets/SVGs';
import { Basket } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { useCarts } from './container';

export const Carts = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { data, addCartOnPress, openAllCartsOnPress } = useCarts();

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: Basket; index: number }) => {
      return <CartItem item={item} index={index} isLast={index + 1 === data.length} />;
    },
    [data.length],
  );

  const renderFooter = useCallback(() => {
    return (
      <Button.Secondary
        fullWidth
        text={t('payments.all')}
        customWrapperStyle={styles.allButton}
        customTextStyle={styles.allButtonText}
        onPress={openAllCartsOnPress}
      />
    );
  }, [styles.allButton, t, styles.allButtonText, openAllCartsOnPress]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerButtonsWrapper}>
        <Text style={styles.mainTitle}>{t('payments.carts')}</Text>
        <Pressable onPress={addCartOnPress}>
          <View style={styles.addTemplateButton}>
            <Plus />
            <Text special children={t('transfers.add')} size={14} style={styles.addTemplateText} />
          </View>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={renderPaymentItem}
        showsHorizontalScrollIndicator={false}
        style={styles.listWrapper}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
