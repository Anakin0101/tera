import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, EmptyCartList, LoadingView } from 'components/index';
import { useStyles } from './CartListScreen.style';
import { useCartList } from './container';
import { CartItem } from 'components/Payments/Carts/CartItem';
import useTheme from 'hooks/useTheme';
import { Plus } from 'assets/SVGs';
import { Basket } from 'services/apis/paymentsAPI/paymentsAPI.types';

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.white} width={24} height={24} />;
};

export const CartListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { data, isLoading, addCartOnPress } = useCartList();

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: Basket; index: number }) => {
      return <CartItem item={item} isLast={index + 1 === data.length} />;
    },
    [data],
  );

  const renderContent = useCallback(() => {
    if (!isLoading && data?.length === 0) {
      return <EmptyCartList />;
    } else {
      return (
        <>
          <FlatList
            data={data}
            renderItem={renderPaymentItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listWrapper}
          />
          <View style={styles.buttonContainer}>
            <Button.Primary
              fullWidth
              text={t('cartListScreen.addCart')}
              customTextStyle={styles.buttonText}
              onPress={addCartOnPress}
              leftIcon={LeftIcon}
            />
          </View>
        </>
      );
    }
  }, [
    addCartOnPress,
    data,
    isLoading,
    renderPaymentItem,
    styles.buttonContainer,
    styles.buttonText,
    styles.listWrapper,
    t,
  ]);

  if (isLoading) {
    return <LoadingView />;
  }

  return <View style={styles.container}>{renderContent()}</View>;
};
