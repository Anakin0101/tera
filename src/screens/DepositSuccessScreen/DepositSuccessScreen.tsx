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
          children={'ანაბარი წარმატებით\nგაიხსნა'}
        />
        <Text
          center
          secondary
          marginTop={20}
          children={'ხელშეკრულება იხილეთ “ჩემი\nდოკუმენტების” გვერდზე'}
        />
        <Button.Secondary
          fullWidth
          text="ტერა საფულეს გააქტიურება"
          onPress={handleTeraWalletPress}
          customWrapperStyle={styles.wallet}
        />
        <Button.Secondary
          fullWidth
          text="ავტომატური გადახდების გააქტიურება"
          customWrapperStyle={styles.autoPayment}
        />
        <Button.Primary
          fullWidth
          text="მთავარზე დაბრუნება"
          onPress={handleHomePress}
          customWrapperStyle={styles.goBack}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
