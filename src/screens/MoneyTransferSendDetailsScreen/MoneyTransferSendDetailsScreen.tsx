import React from 'react';
import { ScrollView, View } from 'react-native';

import { Button, IconComponent, Text } from 'components/index';
import { useStyles } from './MoneyTransferSendDetailsScreen.style';
import { useMoneyTransferSendDetails } from './container';
import { formatMoney } from 'utils/formatMoney';
import { getCurrencyIcon } from 'utils/currency';
import { useTranslation } from 'react-i18next';
import Images from 'theme/Images';

export const MoneyTransferSendDetailsScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const {
    onSubmit,
    providerItem,
    selectedCountry,
    selectedCity,
    mtPoint,
    firstName,
    lastName,
    transferSendPrepareResponse,
    selectedAccount,
    isLoading,
  } = useMoneyTransferSendDetails();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.infoWrapper}>
          <IconComponent
            customIconComponentStyles={styles.iconWrapper}
            pngLocalIcon={Images().SendIcon}
            pressable={false}
          />
          <View>
            <Text children={'moneyTransferSendScreen.title'} style={styles.title} />
            <Text
              style={styles.value}
              children={`${formatMoney(
                transferSendPrepareResponse?.payoutAmount,
              )} ${getCurrencyIcon(transferSendPrepareResponse?.payoutCurrency)}`}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.itemWrapper}>
            <Text style={styles.title} children={'common.from'} />
            <Text style={styles.value} children={'common.myFinancial'} />
            <Text style={styles.title} children={selectedAccount?.accountIban} />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.title} children={'common.country'} />
            <Text style={styles.value} children={selectedCountry?.caption} />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.title} children={'common.currency'} />
            <Text style={styles.value} children={transferSendPrepareResponse?.principalCurrency} />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.title} children={'common.receiver'} />
            <Text style={styles.value} children={`${firstName} ${lastName}`} />
          </View>
          {selectedCity?.name && (
            <View style={styles.itemWrapper}>
              <Text style={styles.title} children={'common.city'} />
              <Text style={styles.value} children={selectedCity?.name} />
            </View>
          )}
          {mtPoint?.address && (
            <View style={styles.itemWrapper}>
              <Text style={styles.title} children={'common.address'} />
              <Text style={styles.value} children={mtPoint?.address} />
            </View>
          )}
          {providerItem?.name && (
            <View style={styles.itemWrapper}>
              <Text style={styles.title} children={'common.receivingPoint'} />
              <Text style={styles.value} children={providerItem?.name} />
            </View>
          )}
          <View style={styles.itemWrapper}>
            <Text style={styles.title} children={'common.money'} />
            <Text
              style={styles.value}
              children={`${formatMoney(
                transferSendPrepareResponse?.payoutAmount,
              )} ${getCurrencyIcon(transferSendPrepareResponse?.payoutCurrency)}`}
            />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.title} children={'common.totalFee'} />
            <Text
              style={styles.value}
              children={`${formatMoney(
                transferSendPrepareResponse?.mtFee?.agentFee +
                  transferSendPrepareResponse?.mtFee?.mtsFee,
              )} ${getCurrencyIcon(transferSendPrepareResponse?.payoutCurrency)}`}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.ctaWrapper}>
        <View style={styles.customButtonWrapper}>
          <Button.Primary
            text={`${t('common.send')} (${formatMoney(
              transferSendPrepareResponse?.payoutAmount +
                transferSendPrepareResponse?.mtFee?.agentFee +
                transferSendPrepareResponse?.mtFee?.mtsFee,
            )}${getCurrencyIcon(transferSendPrepareResponse?.payoutCurrency)})`}
            onPress={onSubmit}
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
};
