import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { Colors } from 'theme/Variables';
import { ChevronDown } from 'assets/SVGs';
import { NextPaymentProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { CurrencySignMap } from 'utils/CurrencySignMap';

export const NextPayment: FC<NextPaymentProps> = ({
  currency,
  nextPaymentAmount,
  nextPaymentDate,
}) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.nextWrapper}>
        <View style={styles.nextPaymentContainer}>
          <View style={styles.nextIcon} />
          <View style={styles.nextDetails}>
            <View>
              <Text children="loans.next" color={Colors.textBlack500} />
              <View style={styles.nextDate}>
                <Text
                  children={`${CurrencySignMap[currency]}${nextPaymentAmount}`}
                  size={16}
                  medium
                />
                <Text label children={nextPaymentDate} special />
              </View>
            </View>
            <Pressable>
              <ChevronDown color={Colors.black700} />
            </Pressable>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};
