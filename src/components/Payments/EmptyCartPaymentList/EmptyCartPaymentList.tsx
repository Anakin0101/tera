import React, { useCallback, memo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './EmptyCartPaymentList.styles';
import { Text } from 'components/Text/Text';
import { Button } from 'components/Button/Button';
import { EmptyCartPayments, Plus } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { MODAL_STACK, NEW_PAYMENT_SCREEN } from 'navigation/ScreenNames';
import useTheme from 'hooks/useTheme';
import { EmptyCartPaymentListProps } from './EmptyCartPaymentList.types';

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.white} width={24} height={24} />;
};

export const EmptyCartPaymentList: React.FC<EmptyCartPaymentListProps> = memo(({ basket }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const addCartOnPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: NEW_PAYMENT_SCREEN,
      params: { basket },
    });
  }, [navigate, basket]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <EmptyCartPayments />
        </View>
        <Text children={t('cartPaymentListScreen.emptyCartPayments')} style={styles.title} />
        <View style={styles.buttonWrapper}>
          <Button.Primary
            text="cartPaymentListScreen.addPayment"
            onPress={addCartOnPress}
            leftIcon={LeftIcon}
            fullWidth
            customTextStyle={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
});
