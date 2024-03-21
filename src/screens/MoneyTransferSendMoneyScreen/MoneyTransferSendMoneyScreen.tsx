import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Divider, MoneyTransferSendMoneyInput, MyBalance, Text } from 'components/index';
import { useStyles } from './MoneyTransferSendMoneyScreen.style';
import { useMoneyTransferSendMoney } from './container';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';

import { Spacing } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { getCurrencyIcon } from 'utils/currency';

export const MoneyTransferSendMoneyScreen = () => {
  const styles = useStyles();
  const {
    onSubmit,
    isKeyboardOpened,
    selectedSendCurrency,
    setSelectedSendCurrency,
    selectedReceiveCurrency,
    setSelectedReceiveCurrency,
    selectedSendCurrencyVal,
    setSelectedSendCurrencyVal,
    selectedReceiveCurrencyVal,
    setSelectedReceiveCurrencyVal,
    selectedAccount,
    setSelectedAccount,
    isLoading,
    transferSendPrepareResponse,
  } = useMoneyTransferSendMoney();

  const feeValue = useCallback(() => {
    let val = 0;
    if (
      transferSendPrepareResponse?.mtFee?.agentFee &&
      transferSendPrepareResponse?.mtFee?.mtsFee
    ) {
      val =
        transferSendPrepareResponse?.mtFee?.agentFee + transferSendPrepareResponse?.mtFee?.mtsFee;
    }

    return `${formatMoney(val)} ${getCurrencyIcon(transferSendPrepareResponse?.payoutCurrency)}`;
  }, [
    transferSendPrepareResponse?.mtFee?.agentFee,
    transferSendPrepareResponse?.mtFee?.mtsFee,
    transferSendPrepareResponse?.payoutCurrency,
  ]);

  const getPayableValue = useCallback(() => {
    let val = 0;
    if (
      transferSendPrepareResponse?.mtFee?.agentFee &&
      transferSendPrepareResponse?.mtFee?.mtsFee
    ) {
      val =
        transferSendPrepareResponse?.mtFee?.agentFee + transferSendPrepareResponse?.mtFee?.mtsFee;
    }

    val += transferSendPrepareResponse?.payoutAmount || 0;

    return `${formatMoney(val)} ${getCurrencyIcon(transferSendPrepareResponse?.payoutCurrency)}`;
  }, [
    transferSendPrepareResponse?.mtFee?.agentFee,
    transferSendPrepareResponse?.mtFee?.mtsFee,
    transferSendPrepareResponse?.payoutAmount,
    transferSendPrepareResponse?.payoutCurrency,
  ]);

  return (
    <KeyboardAvoidingScrollView
      containerStyle={styles.container}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <MyBalance
            selectedAccount={selectedAccount}
            selectAccountOnPress={setSelectedAccount}
            currency={selectedSendCurrency}
          />
          <View style={[styles.wrapper, styles.accountMargin]}>
            <Button.Primary
              text={'common.next'}
              onPress={onSubmit}
              fullWidth
              isLoading={isLoading}
              disabled={!selectedAccount || !selectedSendCurrency}
            />
          </View>
        </View>
      }
    >
      <View style={[styles.container, styles.content]}>
        <MoneyTransferSendMoneyInput
          selectedSendCurrency={selectedSendCurrency}
          setSelectedSendCurrency={setSelectedSendCurrency}
          selectedReceiveCurrency={selectedReceiveCurrency}
          setSelectedReceiveCurrency={setSelectedReceiveCurrency}
          selectedSendCurrencyVal={selectedSendCurrencyVal}
          setSelectedSendCurrencyVal={setSelectedSendCurrencyVal}
          selectedReceiveCurrencyVal={selectedReceiveCurrencyVal}
          setSelectedReceiveCurrencyVal={setSelectedReceiveCurrencyVal}
          isLoading={false}
        />
        {transferSendPrepareResponse && (
          <View style={styles.infoWrapper}>
            <View style={styles.infoItemWrapper}>
              <Text children="common.totalFee" style={styles.infoLabel} />
              <Text children={feeValue()} />
            </View>
            <View style={styles.infoItemWrapper}>
              <Text children="common.fullAmount" style={styles.infoLabel} />
              <Text children={getPayableValue()} />
            </View>
          </View>
        )}
        <Divider height={2} marginTop={Spacing.xxxl} />
      </View>
    </KeyboardAvoidingScrollView>
  );
};
