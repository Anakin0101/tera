import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Button, Checkbox, DetailsItem, Image, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { useNewDepositSummary } from './container';
import { getDateMonthsLater } from 'utils/formatDate';
import { useStyles } from './NewDepositSummaryScreen.styles';
import { Income, Percent, Timer } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { DD_MM_YYYY_SLASH } from 'constants/DateTemplates';

export const NewDepositSummaryScreen = () => {
  const styles = useStyles();

  const {
    handlePress,
    isAgree,
    setIsAgree,
    newDeposit,
    imageUrl,
    isLoadingRegistration,
    isSingleOption,
  } = useNewDepositSummary();

  return (
    <View style={styles.fill}>
      <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View>
              <Text children={newDeposit.depositType} medium size={16} />
              <Text
                children={formatMoney(newDeposit?.initialAmount, newDeposit?.currency)}
                size={18}
              />
            </View>
          </View>
          <View style={styles.headerItemRow}>
            <View style={styles.headerItem}>
              <View style={styles.iconContainer}>
                <Timer />
              </View>
              <View>
                <Text children="deposits.period" secondary label />
                <Text
                  children={isSingleOption ? 'newDeposit.lifetime' : 'newDeposit.months'}
                  translateProp={{ value: newDeposit?.duration }}
                  size={16}
                />
              </View>
            </View>
            <View style={styles.headerItem}>
              <View style={styles.iconContainer}>
                <Income color={Colors.black700} />
              </View>
              <View>
                <Text children="newDeposit.benefit" secondary label />
                <Text
                  children={formatMoney(newDeposit?.benefit, newDeposit?.currency)}
                  size={16}
                  special
                />
              </View>
            </View>
          </View>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer}>
              <Percent />
            </View>
            <View>
              <Text children="deposits.interestRate" secondary label />
              <Text children={`${newDeposit?.interestRate}%`} size={16} />
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.inner}>
            <DetailsItem
              label="newDeposit.fromAccount"
              value={
                <View style={styles.detailsItem}>
                  <Text children={newDeposit?.creditAccount?.iban} size={15} />
                  <Text
                    children={formatMoney(newDeposit?.creditAccount?.balance, newDeposit?.currency)}
                    size={15}
                  />
                </View>
              }
            />
            <DetailsItem
              label="newDeposit.toAccount"
              value={
                <View style={styles.detailsItem}>
                  <Text children={newDeposit?.debitAccount?.iban} size={15} />
                  <Text
                    children={formatMoney(newDeposit?.debitAccount?.balance, newDeposit?.currency)}
                    size={15}
                  />
                </View>
              }
            />
            {!isSingleOption && (
              <DetailsItem
                label="newDeposit.completionDate"
                value={getDateMonthsLater(newDeposit?.duration, DD_MM_YYYY_SLASH)}
              />
            )}
            {!isSingleOption && (
              <DetailsItem
                label="newDeposit.timeOfBenefitTransfer"
                value={newDeposit?.productName?.ka}
              />
            )}
            <DetailsItem label="deposits.interestRate" value={`${newDeposit?.interestRate}%`} />
            <DetailsItem
              label="newDeposit.specialInterestRate"
              value={`${newDeposit?.specialInterestRate}%`}
            />
            <DetailsItem
              label="newDeposit.effectiveInterestRate"
              value={`${newDeposit?.effectiveInterestRate}%`}
            />
            <DetailsItem
              label="newDeposit.benefit"
              value={formatMoney(newDeposit?.benefit, newDeposit?.currency)}
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
              isLoading={isLoadingRegistration}
            />
          </View>
        </View>
      </ScrollView>
      {/* {isLoadingRegistration && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )} */}
    </View>
  );
};
