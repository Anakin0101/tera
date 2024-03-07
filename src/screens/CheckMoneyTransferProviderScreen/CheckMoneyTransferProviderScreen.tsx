import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useForm } from 'react-hook-form';

import { Button, ControlledInput, Text } from 'components/index';
import { useStyles } from './CheckMoneyTransferProviderScreen.style';
import { useCheckMoneyTransferProviderInfo } from './container';

export const CheckMoneyTransferProviderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { isLoading, isKeyboardOpened, setTransferCode, findTransferOnPress } =
    useCheckMoneyTransferProviderInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    findTransferOnPress();
  };

  return (
    <KeyboardAvoidingScrollView
      containerStyle={styles.container}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text={'common.check'}
            onPress={handleSubmit(onSubmit)}
            fullWidth
            isLoading={isLoading}
          />
        </View>
      }
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>
          {t('checkMoneyTransferProviderScreen.enterSenderInfo')}
        </Text>
        <ControlledInput
          control={control}
          name={'transferCode'}
          label={'checkMoneyTransferProviderScreen.transferCode'}
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
            text && setTransferCode(text);
          }}
        />
        {/* {!isAutomaticPayment && !!debtVerifyResults?.length && (
          <SubscriberInfo
            debtVerifyResults={debtVerifyResults}
            feeRules={providerItem?.feeRules || []}
          />
        )} */}
      </SafeAreaView>
    </KeyboardAvoidingScrollView>
  );
};
