import React from 'react';
import { View } from 'react-native';
import { Text, IconComponent } from 'components';
import Images from 'theme/Images';
import { getCurrencyIcon } from 'utils/currency';
import { useStyles } from './Budget.styles';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';
import { BudgetDetailsProps } from './Budget.types';

export const BudgetDetails = ({ selectedPrice, accountFromData }: BudgetDetailsProps) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <IconComponent
        pngLocalIcon={Images().LiabilitiesIcon}
        customIconComponentStyles={styles.customIconComponentStyles}
      />
      <View>
        <Text children="transactions.inBudget" style={styles.textLabel} />
        <Text
          children={`${formatToTwoDecimalPlaces(selectedPrice)} ${getCurrencyIcon(
            accountFromData.ccy,
          )}`}
          style={styles.text}
        />
      </View>
    </View>
  );
};
