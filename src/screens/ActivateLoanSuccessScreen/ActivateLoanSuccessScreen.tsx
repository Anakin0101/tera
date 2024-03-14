import React from 'react';
import { FinishScreenContent } from 'components';
import { useStyles } from './ActivateLoanSuccessScreen.styles';
import { useInitialScreenNavigation } from 'hooks';

export const ActivateLoanSuccessScreen = () => {
  const styles = useStyles();
  const { navigateToInitialScreen } = useInitialScreenNavigation();

  return (
    <FinishScreenContent
      isSuccess
      iconSize={80}
      ctaHandler={navigateToInitialScreen}
      title="approvedLoan.accepted"
      description="common.seeContract"
      ctaTEXT="common.returnToMain"
      buttonStyle={styles.button}
      containerStyle={styles.container}
    />
  );
};
