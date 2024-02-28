import React, { useCallback, memo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './EmptyCartList.styles';
import { Text } from 'components/Text/Text';
import { Button } from 'components/Button/Button';
import { EmptyCarts, Plus } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { ADD_CART_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import useTheme from 'hooks/useTheme';

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.white} width={24} height={24} />;
};

export const EmptyCartList = memo(() => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const addCartOnPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: ADD_CART_SCREEN,
    });
  }, [navigate]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <EmptyCarts />
        </View>
        <Text children={t('cartListScreen.emptyCarts')} style={styles.title} />
        <View style={styles.buttonWrapper}>
          <Button.Primary
            text="cartListScreen.addCart"
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
