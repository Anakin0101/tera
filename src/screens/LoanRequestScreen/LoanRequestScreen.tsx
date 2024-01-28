import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Divider, Image, Text } from 'components';
import { DetailProps } from './LoanRequestScreen.types';
import { useStyles } from './LoanRequestScreen.styles';
import { useLoanRequest } from './container';

const ICON = require('assets/images/Bags.png');

const Detail = ({ value }: DetailProps) => {
  const styles = useStyles();

  return (
    <View style={styles.detailItem}>
      <View style={styles.point} />
      <Text children={value} secondary />
    </View>
  );
};

export const LoanRequestScreen = () => {
  const styles = useStyles();
  const { handleNextPress } = useLoanRequest();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={ICON} style={styles.icon} />
        </View>
        <Text children="loanRequest.request" medium size={18} marginTop={24} />
      </View>
      <Divider height={1} marginTop={32} marginBottom={32} />
      <View style={styles.description}>
        <Text children="products.details" medium size={16} />
        <Text children="აღწერა" secondary marginTop={16} />
        <Detail value="მინიმალური თანხა" />
        <Detail value="ვალუტა" />
        <Detail value="ეფექტური საპროცენტო განაკვეთი" />
        <Detail value="მინიმალური შემოსავალი" />
      </View>
      <Button.Primary
        fullWidth
        text="common.next"
        onPress={handleNextPress}
        customWrapperStyle={styles.button}
      />
    </ScrollView>
  );
};
