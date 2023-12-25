import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNewDepositDetails } from './container';
import { Button, Divider, Text } from 'components';
import { useStyles } from './NewDepositDetailsScreen.styles';

const benefits = [
  'შეინახე თავისუფალი თანხა და მიიღე მაღალი საპროცენტო სარგებელი.',
  'მიიღე სტანდარტულზე 0.1%-ით მეტი სარგებელი ნებისმიერ ვალუტაში გახსნილ ანაბარზე',
];

export const NewDepositDetailsScreen = () => {
  const styles = useStyles();
  const { handlePress } = useNewDepositDetails();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer} />
        <Text children="ვადიანი ანაბარი" medium size={18} marginTop={24} />
        <Text children="საწყისი თანხა 500 ერთეული" secondary />
      </View>
      <Divider height={1} marginTop={32} marginBottom={32} />
      <View style={styles.description}>
        <Text children="products.details" medium size={16} />
        <Text
          children="ვადიანი ანაბარი საშუალებას მოგცემს, წინასწარ განსაზღვრული ვადით განათავსო თანხა ანაბარზე და მიიღო მაღალი საპროცენტო  სარგებელი"
          secondary
          marginTop={16}
        />
        <Text
          children="სპეციალურად შენთვის - გახსენი დეპოზიტი და მიიღე სტანდარტულზე მაღალი საპროცენტო განაკვეთი"
          secondary
          marginTop={16}
        />
        <View style={styles.benefitsContainer}>
          {benefits.map(item => (
            <View style={styles.benefitItem} key={item}>
              <View style={styles.point} />
              <Text children={item} style={styles.flexOne} secondary />
            </View>
          ))}
        </View>
      </View>
      <Button.Primary
        fullWidth
        text="common.next"
        onPress={handlePress}
        customWrapperStyle={styles.button}
      />
    </ScrollView>
  );
};
