import React from 'react';
import { Linking, View } from 'react-native';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useForm } from 'react-hook-form';

import {
  Button,
  Checkbox,
  ControlledInput,
  CurrencyConversion,
  MoneyTransferInfo,
  MyBalance,
  SwitchComponent,
  Text,
} from 'components/index';
import { useStyles } from './CheckMoneyTransferProviderScreen.style';
import { useCheckMoneyTransferProviderInfo } from './container';

export const CheckMoneyTransferProviderScreen = () => {
  const styles = useStyles();

  const {
    isLoading,
    setTransferCode,
    findTransferOnPress,
    transferResponse,
    selectedAccount,
    setSelectedAccount,
    clearTransferResponse,
    openMoneyTransferPermissionScreen,
    termsAndConditionsAccepted,
    setTermsAndConditionsAccepted,
    currencyConversionEnable,
    setCurrencyConversionEnable,
    buyDetails,
    setBuyDetails,
  } = useCheckMoneyTransferProviderInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    if (transferResponse) {
      openMoneyTransferPermissionScreen();
    } else {
      findTransferOnPress();
    }
  };

  const openTermsAndConditions = () => {
    try {
      Linking.openURL('https://terabank.ge/standterms');
    } catch (e) {
      console.warn('openTermsAndConditions', e);
    }
  };

  return (
    <KeyboardAvoidingScrollView
      containerStyle={styles.container}
      contentContainerStyle={styles.wrapper}
      showsVerticalScrollIndicator={false}
      stickyFooter={
        <View style={[styles.ctaWrapper, transferResponse && styles.ctaBG]}>
          {transferResponse && (
            <>
              <MyBalance
                currency={
                  buyDetails?.buyCurrency ? buyDetails?.buyCurrency : transferResponse.currency
                }
                selectedAccount={selectedAccount}
                selectAccountOnPress={setSelectedAccount}
              />
            </>
          )}
          <View style={styles.customButtonWrapper}>
            <Button.Primary
              text={transferResponse ? 'common.next' : 'common.check'}
              onPress={handleSubmit(onSubmit)}
              fullWidth
              isLoading={isLoading}
              disabled={transferResponse && (!selectedAccount || !termsAndConditionsAccepted)}
            />
          </View>
        </View>
      }
    >
      <View style={styles.container}>
        <Text
          style={styles.headerTitle}
          children={'checkMoneyTransferProviderScreen.enterSenderInfo'}
        />
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
            if (text) {
              setTransferCode(text);
              clearTransferResponse();
            }
          }}
        />
        {transferResponse && (
          <>
            <MoneyTransferInfo transferResponse={transferResponse} />
            <View style={styles.currencyConversionWrapper}>
              <Text
                children={'checkMoneyTransferProviderScreen.currencyConversion'}
                style={styles.currencyConversionLabel}
              />
              <SwitchComponent
                onValueChange={() => {
                  setCurrencyConversionEnable(!currencyConversionEnable);

                  if (buyDetails) {
                    setBuyDetails(undefined);
                  }
                  if (selectedAccount) {
                    setSelectedAccount(undefined);
                  }
                }}
                value={currencyConversionEnable}
              />
            </View>
            {currencyConversionEnable && (
              <CurrencyConversion
                transferResponse={transferResponse}
                buyDetails={buyDetails}
                setBuyDetails={val => {
                  setBuyDetails(val);
                  if (selectedAccount) {
                    setSelectedAccount(undefined);
                  }
                }}
              />
            )}
            <View style={styles.termsWrapper}>
              <Checkbox
                isChecked={termsAndConditionsAccepted}
                onChange={() => setTermsAndConditionsAccepted(!termsAndConditionsAccepted)}
              />
              <Text
                children={'checkMoneyTransferProviderScreen.agree'}
                style={[styles.termsText, styles.termsTextMargin]}
              />
              <Button.Text
                text={'checkMoneyTransferProviderScreen.termsAndConditions'}
                onPress={openTermsAndConditions}
                customTextStyle={styles.termsText}
                customWrapperStyle={styles.termsTextWrapper}
              />
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingScrollView>
  );
};
