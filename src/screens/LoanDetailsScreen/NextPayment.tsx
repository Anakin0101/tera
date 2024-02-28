import React, { FC } from 'react';
import { View } from 'react-native';
import { Divider, IconComponent, Text } from 'components';
import { Colors } from 'theme/Variables';
import { NextPaymentProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { formatMoney } from 'utils/formatMoney';
import Images from 'theme/Images';

export const NextPayment: FC<NextPaymentProps> = ({
  currency,
  nextPaymentAmount,
  nextPaymentDate,
  isCreditCardOrOverdraft,
}) => {
  const styles = useStyles();

  if (isCreditCardOrOverdraft) {
    return null;
  }

  return (
    <View>
      <View style={styles.nextPaymentWrapper}>
        <View style={styles.nextPaymentContainer}>
          <IconComponent
            customIconComponentStyles={styles.nextIcon}
            pngLocalIcon={Images().LiabilitiesIcon}
          />
          <View>
            <Text children="loans.next" color={Colors.textBlack500} />
            <View style={styles.nextPaymentDate}>
              <Text children={formatMoney(nextPaymentAmount, currency)} size={16} medium />
              <Text label children={nextPaymentDate} special />
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
};
