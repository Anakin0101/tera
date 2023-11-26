import React, { FC } from 'react';
import { View } from 'react-native';
import { Collapsible, Divider, Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { NextPaymentProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';

const Header = ({ currency, nextPaymentAmount, nextPaymentDate }: NextPaymentProps) => {
  const styles = useStyles();

  return (
    <View style={styles.nextPaymentContainer}>
      <View style={styles.nextIcon} />
      <View>
        <Text children="loans.next" color={Colors.textBlack500} />
        <View style={styles.nextPaymentDate}>
          <Text children={`${CurrencySignMap[currency]}${nextPaymentAmount}`} size={16} medium />
          <Text label children={nextPaymentDate} special />
        </View>
      </View>
    </View>
  );
};

const Content = () => {
  const styles = useStyles();
  return (
    <View style={styles.nextPaymentContent}>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.principal" color={Colors.textBlack500} />
        <Text children={formatMoney(0)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.interest" color={Colors.textBlack500} />
        <Text children={formatMoney(0)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.commission" color={Colors.textBlack500} />
        <Text children={formatMoney(0)} />
      </View>
      <View style={styles.nextPaymentDetails}>
        <Text size={13} children="loans.savedByOffset" color={Colors.textBlack500} />
        <Text children={formatMoney(0)} />
      </View>
    </View>
  );
};

export const NextPayment: FC<NextPaymentProps> = ({
  currency,
  nextPaymentAmount,
  nextPaymentDate,
}) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.nextPaymentWrapper}>
        <Collapsible
          headerHeight={88}
          contentHeight={140}
          renderHeader={
            <Header
              currency={currency}
              nextPaymentDate={nextPaymentDate}
              nextPaymentAmount={nextPaymentAmount}
            />
          }
          renderContent={<Content />}
        />
      </View>
      <Divider />
    </>
  );
};
