import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text } from 'components';
import { CheckLarge } from 'assets/SVGs';
import { useStyles } from './DepositSuccessScreen.styles';
import { useDepositSuccess } from './container';

export const DepositSuccessScreen = () => {
  const styles = useStyles();
  const { handleHomePress, handleTeraWalletPress } = useDepositSuccess();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.iconContainer}>
          <CheckLarge />
        </View>
        <Text
          center
          medium
          size={24}
          marginTop={32}
          lineHeight={34}
          children="newDeposit.success"
        />
        <Text center secondary marginTop={20} children="newDeposit.seeContract" />
        <Button.Secondary
          fullWidth
          text="newDeposit.activateTeraWallet"
          onPress={handleTeraWalletPress}
          customWrapperStyle={styles.wallet}
        />
        <Button.Secondary
          fullWidth
          text="newDeposit.activateAutomaticPayments"
          customWrapperStyle={styles.autoPayment}
        />
        <Button.Primary
          fullWidth
          text="common.returnToMain"
          onPress={handleHomePress}
          customWrapperStyle={styles.goBack}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
