import React from 'react';
import { ScrollView, View } from 'react-native';

import { Button, Checkbox, Text } from 'components/index';
import { useStyles } from './MoneyTransferSendPermissionScreen.style';
import { useMoneyTransferSendPermission } from './container';

export const MoneyTransferSendPermissionScreen = () => {
  const styles = useStyles();

  const {
    onSubmit,
    termsAndConditionsAccepted,
    setTermsAndConditionsAccepted,
    openTermsAndConditions,
  } = useMoneyTransferSendPermission();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
        <Text style={styles.desc} children={'moneyTransferSendPermissionScreen.text'} />
        <View style={styles.termsWrapper}>
          <Checkbox
            isChecked={termsAndConditionsAccepted}
            onChange={() => setTermsAndConditionsAccepted(!termsAndConditionsAccepted)}
          />
          <Text
            children={'checkMoneyTransferProviderScreen.agree'}
            style={[styles.termsText, styles.termsTextMargin]}
          />
          <Button.Text
            text={'checkMoneyTransferProviderScreen.termsAndConditions'}
            onPress={openTermsAndConditions}
            customTextStyle={styles.termsText}
            customWrapperStyle={styles.termsTextWrapper}
          />
        </View>
      </ScrollView>
      <View style={styles.ctaWrapper}>
        <View style={styles.customButtonWrapper}>
          <Button.Primary
            text={'common.next'}
            onPress={onSubmit}
            fullWidth
            disabled={!termsAndConditionsAccepted}
          />
        </View>
      </View>
    </View>
  );
};
