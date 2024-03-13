import React, { FC, memo, useCallback } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from 'theme/Images';
import { IconComponent, Text } from '../index';
import { MainStackScreenProps } from 'navigation/types';
import { APPROVED_LOAN_DETAILS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { CreditDisbursementItemProps } from './DepositsAndLoans.types';
import { useStyles } from './DepositsAndLoans.styles';

export const CreditDisbursementItem: FC<CreditDisbursementItemProps> = memo(({ item }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handleActivateLoanPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: APPROVED_LOAN_DETAILS_SCREEN,
      params: { creditDisbursementId: item?.creditDisbursementId },
    });
  }, [item?.creditDisbursementId, navigate]);

  return (
    <Pressable onPress={handleActivateLoanPress} style={styles.creditDisbursement}>
      <IconComponent
        customIconComponentStyles={[styles.cardContainer, styles.bgWhite]}
        pngLocalIcon={Images().Bags}
      />
      <Text secondary children={item?.title} />
    </Pressable>
  );
});
