import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, CartPayItemWithStatus, Text } from 'components/index';
import { useStyles } from './CartPaymentSuccessScreen.style';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { formatMoney } from 'utils/formatMoney';
import { SuccessTransaction, Warning } from 'assets/SVGs';
import { DASHBOARD_SCREEN } from 'navigation/ScreenNames';
import { ProviderItemProps } from 'services/apis/paymentsAPI/paymentsAPI.types';

export const CartPaymentSuccessScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { params } = useRoute<MainStackRouteProps<'CartPaymentSuccessScreen'>>();
  const { paymentResults, sum, providerItems } = params || {};

  const { navigate } = useNavigation<MainStackScreenProps<'CartPaymentSuccessScreen'>>();

  const openMainScreen = () => {
    navigate(DASHBOARD_SCREEN);
  };

  const renderItem = ({ item }: { item: ProviderItemProps }) => {
    return <CartPayItemWithStatus item={item} paymentResults={paymentResults} />;
  };

  const hasFailedPayment = useMemo(
    () => paymentResults.some(payment => payment.success === false),
    [paymentResults],
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {hasFailedPayment ? <Warning /> : <SuccessTransaction width={80} height={80} />}
        <Text
          style={styles.headerTitle}
          children={
            hasFailedPayment
              ? 'paymentSuccessScreen.someItemRejected'
              : 'paymentSuccessScreen.title'
          }
        />
        <View style={styles.moneyWrapper}>
          <Text style={styles.moneyLabel} children={'paymentSuccessScreen.money'} />
          <Text
            style={[styles.moneyLabel, styles.moneyLabelBlack]}
            children={`${formatMoney(sum)} ₾`}
          />
        </View>
        <View style={styles.nextButtonWrapper}>
          <Button.Primary
            text={t('paymentSuccessScreen.mainPage')}
            onPress={openMainScreen}
            customTextStyle={styles.buttonLabel}
          />
        </View>
      </View>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={providerItems}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </View>
  );
};
