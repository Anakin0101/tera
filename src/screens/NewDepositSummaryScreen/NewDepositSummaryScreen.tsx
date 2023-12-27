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
              <Text children="ხანგრძლივობა" secondary label />
              <Text children="12 თვე" size={16} />
            </View>
          </View>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer} />
            <View>
              <Text children="ბენეფიტი" secondary label />
              <Text children={formatMoney(100, 'GEL')} size={16} special />
            </View>
          </View>
        </View>
        <View style={styles.headerItem}>
          <View style={styles.iconContainer} />
          <View>
            <Text children="საპროცენტო განაკვეთი" secondary label />
            <Text children="12.01%" size={16} />
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.inner}>
          <DetailsItem
            label="ანგარიში საიდანაც გსურთ გადმორიცხვა"
            value={
              <View style={styles.detailsItem}>
                <Text children="GB468934587345340900" size={15} />
                <Text children={formatMoney(1000, 'GEL')} size={15} />
              </View>
            }
          />
          <DetailsItem
            label="ანგარიში სადაც გსურთ სარგებლის ჩარიცხვა"
            value={
              <View style={styles.detailsItem}>
                <Text children="GB468934587345340900" size={15} />
                <Text children={formatMoney(1000, 'GEL')} size={15} />
              </View>
            }
          />
          <DetailsItem label="დასრულების თარიღი" value="25/01/2023" />
          <DetailsItem label="სარგებლის ჩარიცხვის დრო" value="ვადის ბოლოს" />
          <DetailsItem label="საპროცენტო განაკვეთი" value="11.5%" />
          <DetailsItem label="საპროცენტო განაკვეთი შენთვის" value="12.00%" />
          <DetailsItem label="ეფექტური საპროცენტო განაკვეთი" value="12.01%" />
          <DetailsItem label="ბენეფიტი" value="100.00 ₾" />
        </View>
        <View style={styles.footer}>
          <Checkbox
            isChecked={isAgree}
            onChange={setIsAgree}
            label={
              <View style={styles.checkbox}>
                <Text children="ვეთანხმები" label />
                <Pressable>
                  <Text children=" არსებული ხელშეკრულების პირობებს" label special />
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
