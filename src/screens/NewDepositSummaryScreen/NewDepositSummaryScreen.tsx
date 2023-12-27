import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Button, Checkbox, DetailsItem, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { useNewDepositSummary } from './container';
import { useStyles } from './NewDepositSummaryScreen.styles';

export const NewDepositSummaryScreen = () => {
  const styles = useStyles();

  const { handlePress, isAgree, setIsAgree } = useNewDepositSummary();

  return (
    <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <View style={styles.iconContainer} />
          <View>
            <Text children="შემნახველი ანაბარი" medium size={16} />
            <Text children={formatMoney(1000, 'GEL')} size={18} />
          </View>
        </View>
        <View style={styles.headerItemRow}>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer} />
            <View>
              <Text children="deposits.period" secondary label />
              <Text children="newDeposit.months" translateProp={{ value: 12 }} size={16} />
            </View>
          </View>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer} />
            <View>
              <Text children="newDeposit.benefit" secondary label />
              <Text children={formatMoney(100, 'GEL')} size={16} special />
            </View>
          </View>
        </View>
        <View style={styles.headerItem}>
          <View style={styles.iconContainer} />
          <View>
            <Text children="deposits.interestRate" secondary label />
            <Text children="12.01%" size={16} />
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.inner}>
          <DetailsItem
            label="newDeposit.fromAccount"
            value={
              <View style={styles.detailsItem}>
                <Text children="GB468934587345340900" size={15} />
                <Text children={formatMoney(1000, 'GEL')} size={15} />
              </View>
            }
          />
          <DetailsItem
            label="newDeposit.toAccount"
            value={
              <View style={styles.detailsItem}>
                <Text children="GB468934587345340900" size={15} />
                <Text children={formatMoney(1000, 'GEL')} size={15} />
              </View>
            }
          />
          <DetailsItem label="newDeposit.completionDate" value="25/01/2023" />
          <DetailsItem label="newDeposit.timeOfBenefitTransfer" value="ვადის ბოლოს" />
          <DetailsItem label="deposits.interestRate" value="11.5%" />
          <DetailsItem label="newDeposit.specialInterestRate" value="12.00%" />
          <DetailsItem label="newDeposit.effectiveInterestRate" value="12.01%" />
          <DetailsItem label="newDeposit.benefit" value="100.00 ₾" />
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
            customWrapperStyle={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};
