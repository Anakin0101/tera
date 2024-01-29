import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FinishScreenContent } from 'components';
import { PRODUCTS_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';
import { useStyles } from './TeraWalletScreen.styles';

export const TeraWalletSuccess = () => {
  const styles = useStyles();
  const { reset } = useNavigation<ProductsStackScreenProps<'ProductsScreen'>>();

  const handleHomePress = useCallback(() => {
    reset({
      index: 0,
      routes: [{ name: PRODUCTS_SCREEN }],
    });
  }, [reset]);

  return (
    <FinishScreenContent
      isSuccess
      iconSize={80}
      ctaHandler={handleHomePress}
      title="teraWallet.success"
      description="common.seeContract"
      ctaTEXT="common.returnToMain"
      buttonStyle={styles.successButton}
      containerStyle={styles.successContainer}
    />
  );
};
