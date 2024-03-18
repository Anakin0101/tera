import React from 'react';
import { ScrollView, View } from 'react-native';

import { Button, Checkbox, Text } from 'components/index';
import { useStyles } from './MoneyTransferPermissionScreen.style';
import { CheckedValueEnum, useCheckMoneyTransferProviderInfo } from './container';

export const MoneyTransferPermissionScreen = () => {
  const styles = useStyles();

  const { checkedValue, setCheckedValue, receiveTransferOnPress, isLoading } =
    useCheckMoneyTransferProviderInfo();

  const onSubmit = () => {
    receiveTransferOnPress();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle} children={'moneyTransferPermissionScreen.provideInfo'} />
        <Text style={styles.desc} children={'moneyTransferPermissionScreen.confirmText'} />
        <View style={styles.checkWrapper}>
          <Checkbox
            isChecked={checkedValue === CheckedValueEnum.accept}
            onChange={() => {
              setCheckedValue(
                checkedValue === CheckedValueEnum.accept ? undefined : CheckedValueEnum.accept,
              );
            }}
          />
          <Text
            style={styles.conditionLabel}
            children={'moneyTransferPermissionScreen.acceptConditions'}
          />
        </View>

        <Text style={styles.desc} children={'moneyTransferPermissionScreen.confirmText2'} />
        <View style={styles.checkWrapper}>
          <Checkbox
            isChecked={checkedValue === CheckedValueEnum.notAccept}
            onChange={() => {
              setCheckedValue(
                checkedValue === CheckedValueEnum.notAccept
                  ? undefined
                  : CheckedValueEnum.notAccept,
              );
            }}
          />
          <Text
            style={styles.conditionLabel}
            children={'moneyTransferPermissionScreen.notAcceptConditions'}
          />
        </View>
      </ScrollView>
      <View style={styles.ctaWrapper}>
        <View style={styles.customButtonWrapper}>
          <Button.Primary
            text={'common.next'}
            onPress={onSubmit}
            fullWidth
            isLoading={isLoading}
            disabled={!checkedValue || isLoading}
          />
        </View>
      </View>
    </View>
  );
};
