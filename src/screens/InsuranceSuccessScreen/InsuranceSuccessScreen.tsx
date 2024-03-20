import React from 'react';
import { FinishScreenContent } from 'components';
import { useInitialScreenNavigation } from 'hooks';
import { useStyles } from './InsuranceSuccessScreen.styles';

export const InsuranceSuccessScreen = () => {
  const styles = useStyles();
  const { navigateToInitialScreen } = useInitialScreenNavigation();

  return (
    <FinishScreenContent
      isSuccess
      iconSize={80}
      ctaHandler={navigateToInitialScreen}
      title="products.insuranceSuccess"
      description="common.seeContract"
      ctaTEXT="common.returnToMain"
      buttonStyle={styles.button}
      containerStyle={styles.container}
    />
  );
};
