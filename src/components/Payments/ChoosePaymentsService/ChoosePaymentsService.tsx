import React, { useCallback, useMemo } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './ChoosePaymentsService.styles';
import { Text } from 'components/Text/Text';
import { AutomaticPayment, MobilePayment, ParkingAndFines, Payments } from 'assets/SVGs';
import { ChoosePaymentsListProps } from './ChoosePaymentsService.types';
import { PaymentItem } from './PaymentItem';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import {
  AUTOMATIC_PAYMENTS_SCREEN,
  CHOOSE_PAYMENT_PROVIDER_SCREEN,
  MODAL_STACK,
  NEW_PAYMENT_SCREEN,
} from 'navigation/ScreenNames';

export const ChoosePaymentsService = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handleParkingAndFinesNavigation = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: CHOOSE_PAYMENT_PROVIDER_SCREEN,
      params: { isParkingAndFines: true },
    });
  }, [navigate]);

  const choosePaymentsList: Array<ChoosePaymentsListProps> = useMemo(
    () => [
      {
        id: '1',
        title: t('payments.payments'),
        icon: <Payments />,
        onPress: () => navigate(MODAL_STACK, { screen: NEW_PAYMENT_SCREEN }),
      },
      {
        id: '2',
        title: t('payments.mobilePayment'),
        icon: <MobilePayment />,
        onPress: () => Alert.alert('მობილურის შევსება'),
      },
      {
        id: '3',
        title: t('payments.automaticPayment'),
        icon: <AutomaticPayment />,
        onPress: () =>
          navigate(MODAL_STACK, {
            screen: AUTOMATIC_PAYMENTS_SCREEN,
          }),
      },
      {
        id: '4',
        title: t('payments.parkingAndFines'),
        icon: <ParkingAndFines strokeWidth={1.8} />,
        onPress: handleParkingAndFinesNavigation,
      },
    ],
    [handleParkingAndFinesNavigation, navigate, t],
  );

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: ChoosePaymentsListProps; index: number }) => {
      return <PaymentItem item={item} isLast={index + 1 === choosePaymentsList.length} />;
    },
    [choosePaymentsList.length],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle}>{t('payments.chooseService')}</Text>
      <FlatList
        data={choosePaymentsList}
        renderItem={renderPaymentItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listWrapper}
      />
    </View>
  );
};
