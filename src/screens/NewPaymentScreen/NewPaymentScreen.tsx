import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChoosePaymentItem, SearchComponent, Text } from 'components/index';
import { useStyles } from './NewPaymentScreen.style';
import { ChoosePaymentItemProps } from 'components/Payments/ChoosePaymentItem/ChoosePaymentItem.types';
import {
  InsurancePension,
  InternetTVMobile,
  Microfinance,
  MobilePayment,
  ParkingAndFines,
  Payments,
  Education,
  StateServices,
  Gambling,
  Other,
} from 'assets/SVGs';

export const NewPaymentScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [searchText, setSearchText] = useState<string>('');

  const data: Array<ChoosePaymentItemProps> = useMemo(
    () => [
      {
        id: '0',
        title: t('newPayment.utilityServices'),
        icon: <Payments />,
        onPress: () => Alert.alert('კომუნალური მომსახურება'),
      },
      {
        id: '1',
        title: t('newPayment.internet_TV_Phone'),
        icon: <InternetTVMobile strokeWidth={1.8} />,
        onPress: () => Alert.alert('ინტერნეტი ტვ ტელეფონი'),
      },
      {
        id: '2',
        title: t('newPayment.mobile'),
        icon: <MobilePayment />,
        onPress: () => Alert.alert('mobile'),
      },
      {
        id: '3',
        title: t('newPayment.microfinance'),
        icon: <Microfinance strokeWidth={1.8} />,
        onPress: () => Alert.alert('microfinance'),
      },
      {
        id: '4',
        title: t('newPayment.insurance_pension'),
        icon: <InsurancePension strokeWidth={1.8} />,
        onPress: () => Alert.alert('insurance_pension'),
      },
      {
        id: '5',
        title: t('newPayment.education'),
        icon: <Education />,
        onPress: () => Alert.alert('education'),
      },
      {
        id: '6',
        title: t('newPayment.stateServices'),
        icon: <StateServices strokeWidth={0.4} />,
        onPress: () => Alert.alert('stateServices'),
      },
      {
        id: '7',
        title: t('newPayment.gambling'),
        icon: <Gambling strokeWidth={0.6} />,
        onPress: () => Alert.alert('gambling'),
      },
      {
        id: '8',
        title: t('newPayment.parking_fines'),
        icon: <ParkingAndFines strokeWidth={1.8} />,
        onPress: () => Alert.alert('parking_fines'),
      },
      {
        id: '9',
        title: t('newPayment.other'),
        icon: <Other />,
        onPress: () => Alert.alert('gambling'),
      },
    ],
    [t],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ChoosePaymentItemProps; index: number }) => {
      return (
        <ChoosePaymentItem
          id={item.id}
          icon={item.icon}
          isLast={index === data?.length - 1}
          title={item.title}
          onPress={item.onPress}
        />
      );
    },
    [data?.length],
  );

  const renderHeader = useCallback(() => {
    return (
      <View>
        <Text style={styles.headerTitle}>{t('newPayment.chooseService')}</Text>
      </View>
    );
  }, [styles.headerTitle, t]);

  return (
    <View style={styles.container}>
      <SearchComponent
        placeholder={t('newPayment.searchPlaceholder')}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listWrapper}
      />
    </View>
  );
};
