import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '../index';
import { OfferPercent } from 'assets/SVGs';
import { APPROVED_LOAN_DETAILS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { CreditDisbursementProps } from './Offers.types';
import { MainStackScreenProps } from 'navigation/types';
import { useStyles } from './Offers.styles';

export const CreditDisbursement: FC<CreditDisbursementProps> = ({ item }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handleActivateLoanPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: APPROVED_LOAN_DETAILS_SCREEN,
      params: { creditDisbursementId: item?.creditDisbursementId },
    });
  }, [item?.creditDisbursementId, navigate]);

  return (
    <View style={styles.disbursementContainer}>
      <OfferPercent />
      <View style={styles.content}>
        <Text medium children={item?.title} size={14} lineHeight={20} />
        <Button.Primary
          text="loans.activate"
          onPress={handleActivateLoanPress}
          customWrapperStyle={styles.button}
        />
      </View>
    </View>
  );
};
