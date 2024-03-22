import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, LoadingView, MoneyTransferDropDownFieldInput, Text } from 'components/index';
import { useStyles } from './MoneyTransferSendAddressScreen.style';
import { useMoneyTransferSendAddress } from './container';

export const MoneyTransferSendAddressScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const {
    isLoading,
    countries,
    selectedCountry,
    setSelectedCountry,
    cities,
    selectedCity,
    setSelectedCity,
    mtPoints,
    selecteMTPoint,
    setSelecteMTPoint,
    isCityRequired,
    isAddressRequired,
    onSubmit,
  } = useMoneyTransferSendAddress();

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle} children={'moneyTransferSendAddressScreen.title'} />
      </View>
      <View style={styles.wrapper}>
        <MoneyTransferDropDownFieldInput
          name={t('common.country')}
          selectedItem={selectedCountry}
          onChangeText={setSelectedCountry}
          fieldItems={countries}
        />
        {isCityRequired && cities?.length > 0 && (
          <MoneyTransferDropDownFieldInput
            name={t('common.city')}
            selectedItem={selectedCity}
            onChangeText={setSelectedCity}
            fieldItems={cities}
          />
        )}
        {isAddressRequired && mtPoints?.length > 0 && (
          <MoneyTransferDropDownFieldInput
            name={t('common.address')}
            selectedItem={selecteMTPoint}
            onChangeText={setSelecteMTPoint}
            fieldItems={mtPoints}
          />
        )}
      </View>
      <View style={styles.ctaWrapper}>
        <View style={styles.customButtonWrapper}>
          <Button.Primary
            text={'common.next'}
            onPress={onSubmit}
            fullWidth
            disabled={
              isLoading ||
              (isCityRequired && !selectedCity) ||
              (isAddressRequired && !selecteMTPoint)
            }
          />
        </View>
      </View>
    </View>
  );
};
