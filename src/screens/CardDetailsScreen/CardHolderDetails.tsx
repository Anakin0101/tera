import React, { FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './CardDetailsScreen.styles';
import { Text } from 'components/index';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import dayjs from 'dayjs';
import { CardHolderDetailProps } from './CardHolderDetailsProps.types';
import { CardEye } from 'assets/SVGs';

export const CardHolderDetails: FC<CardHolderDetailProps> = ({ accountNumber, endDate, cvv }) => {
  const formattedDate = dayjs(endDate).format('MM/YY');
  const [showNumbers, setShowNumbers] = useState(true);

  const toggleVisibility = () => {
    setShowNumbers(!showNumbers);
  };

  const maskAccountNumber = showNumbers
    ? accountNumber.toString()
    : '************' + accountNumber.toString().slice(-4);
  const maskCVV = showNumbers ? cvv.toString() : '***';

  const styles = useStyles();

  return (
    <View style={styles.backgroundWhite}>
      <View style={styles.detailsSectionWrapper}>
        <View style={styles.wrapper}>
          <Text children="products.details" size={18} demiBold />
          <Pressable onPress={toggleVisibility} style={styles.pressable}>
            <CardEye />
            <Text children="გამოჩენა" size={14} medium style={{ marginLeft: 5 }} />
          </Pressable>
        </View>
        <View style={styles.cardView}>
          <DetailsItem
            label="products.cardNumber"
            value={maskAccountNumber.slice(0, -4) + maskAccountNumber.slice(-4)}
            onPress={() => {}}
          />
          <DetailsItem label="products.dueDate" value={formattedDate} onPress={() => {}} />
          <DetailsItem label="products.CVV" value={maskCVV} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};
