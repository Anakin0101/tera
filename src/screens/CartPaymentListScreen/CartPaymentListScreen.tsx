import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, CartPaymentItem, EmptyCartPaymentList, LoadingView } from 'components/index';
import { useStyles } from './CartPaymentListScreen.style';
import { useCartPaymentList } from './container';
import useTheme from 'hooks/useTheme';
import { Plus } from 'assets/SVGs';
import { Basket } from 'services/apis/paymentsAPI/paymentsAPI.types';

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.white} width={24} height={24} />;
};

export const CartPaymentListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { addPaymentOnPress, isLoading, data, basket } = useCartPaymentList();

  const renderPaymentItem = useCallback(({ item, index }: { item: Basket; index: number }) => {
    return <CartPaymentItem item={item} isLast={index + 1 === 0} />;
  }, []);

  const renderContent = useCallback(() => {
    if (data?.length < 1) {
      return <EmptyCartPaymentList basket={basket} />;
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
              text={t('cartPaymentListScreen.addPayment')}
              customTextStyle={styles.buttonText}
              onPress={addPaymentOnPress}
              leftIcon={LeftIcon}
            />
          </View>
        </>
      );
    }
  }, [
    addPaymentOnPress,
    basket,
    data,
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
