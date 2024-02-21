import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useForm } from 'react-hook-form';

import { Button, ControlledInput, Text } from 'components/index';
import { useStyles } from './AddCartScreen.style';
import { useAddCart } from './container';
import { MainStackRouteProps } from 'navigation/types';
import { useRoute } from '@react-navigation/native';

export const AddCartScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { params } = useRoute<MainStackRouteProps<'AddCartScreen'>>();

  const { basket } = params || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { cartName: basket?.name } });

  const {
    isKeyboardOpened,
    setCartName,
    addBaskeetServiceOnPress,
    isSending,
    updateBasketServiceOnPress,
  } = useAddCart();

  const onSubmit = () => {
    if (basket?.id) {
      updateBasketServiceOnPress(basket.id);
    } else {
      addBaskeetServiceOnPress();
    }
  };

  return (
    <KeyboardAvoidingScrollView
      containerStyle={styles.container}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text={basket?.id ? 'common.update' : 'common.add'}
            onPress={handleSubmit(onSubmit)}
            fullWidth
            isLoading={isSending}
          />
        </View>
      }
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>{t('addCartScreen.enterCartName')}</Text>
        <ControlledInput
          control={control}
          name={'cartName'}
          label={t('addCartScreen.cartName')}
          marginTop={24}
          errors={errors}
          required={true}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
          }}
          handleChange={text => {
            text && setCartName(text);
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingScrollView>
  );
};
