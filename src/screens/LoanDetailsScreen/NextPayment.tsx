import React, { FC } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { Colors } from 'theme/Variables';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { NextPaymentProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';

export const NextPayment: FC<NextPaymentProps> = ({
  currency,
  nextPaymentAmount,
  nextPaymentDate,
}) => {
  const styles = useStyles();

  return (
    <>
      <View style={styles.nextPaymentWrapper}>
        <View style={styles.nextPaymentContainer}>
          <View style={styles.nextIcon} />
          <View>
            <Text children="loans.next" color={Colors.textBlack500} />
            <View style={styles.nextPaymentDate}>
              <Text
                children={`${CurrencySignMap[currency]}${nextPaymentAmount}`}
                size={16}
                medium
              />
              <Text label children={nextPaymentDate} special />
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};
