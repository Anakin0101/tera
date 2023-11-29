import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { Note } from 'assets/SVGs';
import { LoanDetails } from './LoanDetails';
import { OverdraftDetails } from './OverdraftDetails';
import { DetailsProps } from './LoanDetailsScreen.types';
import { useStyles } from './LoanDetailsScreen.styles';
import { CreditCardDetails } from './CreditCardDetails';

export const Details: FC<DetailsProps> = ({ data }) => {
  const styles = useStyles();

  const renderDetails = () => {
    if ('creditLimit' in data) {
      return <CreditCardDetails creditCard={data} />;
    }

    if ('creditStatus' in data) {
      return <LoanDetails loan={data} />;
    }

    if ('overdraftLimit' in data) {
      return <OverdraftDetails overdraft={data} />;
    }
  };

  return (
    <View style={styles.details}>
      <Text children="products.details" size={18} medium />
      {renderDetails()}
      <Pressable style={styles.agreementButton}>
        <View style={styles.innerContainer}>
          <Note />
          <Text children="deposits.agreementDoc" special />
        </View>
      </Pressable>
    </View>
  );
};
