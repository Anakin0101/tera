import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Button, Checkbox, DetailsItem, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { useNewDepositSummary } from './container';
import { getDateMonthsLater } from 'utils/formatDate';
import { useStyles } from './NewDepositSummaryScreen.styles';

export const NewDepositSummaryScreen = () => {
  const styles = useStyles();

  const { handlePress, isAgree, setIsAgree, newDeposit } = useNewDepositSummary();

  return (
    <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <View style={styles.iconContainer} />
          <View>
            <Text children={newDeposit.depositType} medium size={16} />
            <Text children={formatMoney(newDeposit.initialAmount, newDeposit.currency)} size={18} />
          </View>
        </View>
        <View style={styles.headerItemRow}>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer} />
            <View>
              <Text children="deposits.period" secondary label />
              <Text
                children="newDeposit.months"
                translateProp={{ value: newDeposit.duration }}
                size={16}
              />
            </View>
          </View>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer} />
            <View>
              <Text children="newDeposit.benefit" secondary label />
              <Text
                children={formatMoney(newDeposit.benefit, newDeposit.currency)}
                size={16}
                special
              />
            </View>
          </View>
        </View>
        <View style={styles.headerItem}>
          <View style={styles.iconContainer} />
          <View>
            <Text children="deposits.interestRate" secondary label />
            <Text children={`${newDeposit.interestRate}%`} size={16} />
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.inner}>
          <DetailsItem
            label="newDeposit.fromAccount"
            value={
              <View style={styles.detailsItem}>
                <Text children={newDeposit.initAccount} size={15} />
                <Text
                  children={formatMoney(
                    newDeposit.initAccountAvailableBalance,
                    newDeposit.currency,
                  )}
                  size={15}
                />
              </View>
            }
          />
          <DetailsItem
            label="newDeposit.toAccount"
            value={
              <View style={styles.detailsItem}>
                <Text children={newDeposit.finalAccount} size={15} />
                <Text
                  children={formatMoney(
                    newDeposit.finalAccountAvailableBalance,
                    newDeposit.currency,
                  )}
                  size={15}
                />
              </View>
            }
          />
          <DetailsItem
            label="newDeposit.completionDate"
            value={getDateMonthsLater(newDeposit.duration, 'DD/MM/YYYY')}
          />
          <DetailsItem
            label="newDeposit.timeOfBenefitTransfer"
            value={newDeposit.withdrawalPeriod}
          />
          <DetailsItem label="deposits.interestRate" value={`${newDeposit.interestRate}%`} />
          <DetailsItem
            label="newDeposit.specialInterestRate"
            value={`${newDeposit.specialInterestRate}%`}
          />
          <DetailsItem
            label="newDeposit.effectiveInterestRate"
            value={`${newDeposit.effectiveInterestRate}%`}
          />
          <DetailsItem
            label="newDeposit.benefit"
            value={formatMoney(newDeposit.benefit, newDeposit.currency)}
          />
        </View>
        <View style={styles.footer}>
          <Checkbox
            isChecked={isAgree}
            onChange={setIsAgree}
            label={
              <View style={styles.checkbox}>
                <Text children="products.agree" label />
                <Pressable>
                  <Text children="newDeposit.termsOfContract" label special />
                </Pressable>
              </View>
            }
          />
          <Button.Primary
            fullWidth
            text="common.next"
            onPress={handlePress}
            customWrapperStyle={[styles.button, !isAgree && styles.disabled]}
          />
        </View>
      </View>
    </ScrollView>
  );
};
