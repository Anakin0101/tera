import React from 'react';
import { FinishScreenContent } from 'components';
import { useLoanRequestAccepted } from './container';
import { useStyles } from './LoanRequestAcceptedScreen.styles';

export const LoanRequestAcceptedScreen = () => {
  const styles = useStyles();
  const { loanType, handleHomePress } = useLoanRequestAccepted();

  return (
    <FinishScreenContent
      isSuccess
      iconSize={80}
      ctaHandler={handleHomePress}
      title="loanRequest.requestAccepted"
      titleTranslateProp={{ value: loanType }}
      description="common.seeContract"
      ctaTEXT="common.returnToMain"
      buttonStyle={styles.button}
      containerStyle={styles.container}
    />
  );
};
