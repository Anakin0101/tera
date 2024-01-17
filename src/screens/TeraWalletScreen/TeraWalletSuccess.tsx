import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useStyles } from './TeraWalletScreen.styles';
import { CheckLarge } from 'assets/SVGs';
import { Button, Text } from 'components';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { PRODUCTS_SCREEN } from 'navigation/ScreenNames';

export const TeraWalletSuccess = () => {
  const styles = useStyles();
  const { reset } = useNavigation<ProductsStackScreenProps<'ProductsScreen'>>();

  const handleHomePress = () => {
    reset({
      index: 0,
      routes: [{ name: PRODUCTS_SCREEN }],
    });
  };

  return (
    <SafeAreaView style={styles.successContainer}>
      <View style={styles.successIcon}>
        <CheckLarge />
      </View>
      <Text center medium size={24} marginTop={32} lineHeight={34} children="teraWallet.success" />
      <Text center secondary marginTop={20} children="newDeposit.seeContract" />
      <View style={styles.buttonContainer}>
        <Button.Primary
          text="common.returnToMain"
          onPress={handleHomePress}
          customWrapperStyle={styles.successButton}
        />
      </View>
    </SafeAreaView>
  );
};
