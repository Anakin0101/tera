import React from 'react';
import { FinishScreenContent } from 'components';
import { useActivateLoanSuccess } from './container';
import { useStyles } from './ActivateLoanSuccessScreen.styles';

export const ActivateLoanSuccessScreen = () => {
  const styles = useStyles();
  const { handlePress } = useActivateLoanSuccess();

  return (
    <FinishScreenContent
      isSuccess
      iconSize={80}
      ctaHandler={handlePress}
      title="approvedLoan.accepted"
      description="common.seeContract"
      ctaTEXT="common.returnToMain"
      buttonStyle={styles.button}
      containerStyle={styles.container}
    />
  );
};
