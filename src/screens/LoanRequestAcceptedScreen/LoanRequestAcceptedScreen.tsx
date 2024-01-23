import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Text } from 'components';
import { CheckLarge } from 'assets/SVGs';
import { useLoanRequestAccepted } from './container';
import { useStyles } from './LoanRequestAcceptedScreen.styles';

export const LoanRequestAcceptedScreen = () => {
  const styles = useStyles();
  const { loanType, handleHomePress } = useLoanRequestAccepted();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <CheckLarge />
      </View>
      <Text
        medium
        center
        headline
        marginTop={24}
        children="loanRequest.requestAccepted"
        translateProp={{ value: loanType }}
      />
      <Text children="common.seeContract" secondary center marginTop={24} />
      <Button.Primary
        onPress={handleHomePress}
        text="common.returnToMain"
        customWrapperStyle={styles.button}
      />
    </SafeAreaView>
  );
};
