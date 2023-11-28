import React, { FC } from 'react';
import { View } from 'react-native';
import { ProgressBar, Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { LoanSliderItemProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { formatDate } from 'utils/formatDate';
import { horizontalScale, moderateScale } from 'utils/config';

const PROGRESS_WIDTH = horizontalScale(340) - 2 * moderateScale(30);

export const LoanSliderItem: FC<LoanSliderItemProps> = ({ item }) => {
  const styles = useStyles();

  const isOverdraft = 'overdraftLimit' in item;

  return (
    <View style={styles.card}>
      <View>
        <View style={styles.header}>
          <View style={styles.iconContainer} />
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} children={item.productName} color={Colors.inactiveTint} />
            <Text size={30} medium lineHeight={34}>
              {formatMoney(
                isOverdraft ? item?.overdraftLimit - item?.usedPrincipalAmount : item?.amount || 0,
              )}{' '}
              {CurrencySignMap[item.currency]}
            </Text>
          </View>
        </View>
        {isOverdraft && (
          <View style={styles.progressbarWrapper}>
            <View style={styles.progressbarContainer}>
              <Text
                color={Colors.success}
                children={formatMoney(item.usedPrincipalAmount, item.currency)}
              />
              <Text
                color={Colors.textBlack500}
                children={formatMoney(item.overdraftLimit, item.currency)}
              />
            </View>
            <ProgressBar
              marginTop={2}
              max={item.overdraftLimit}
              used={item.usedPrincipalAmount}
              width={PROGRESS_WIDTH}
              height={moderateScale(6)}
            />
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Text
          label
          children={'loans.nextPayment'}
          translateProp={{ value: formatDate(item?.nextPaymentDate, ' YYYY ') }}
          color={Colors.textBlack500}
        />
        <Text
          label
          medium
          color={Colors.error}
          children={formatMoney(item.nextPaymentAmount || 0, item.currency)}
        />
      </View>
    </View>
  );
};
