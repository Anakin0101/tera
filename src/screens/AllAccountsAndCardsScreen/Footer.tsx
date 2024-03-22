import React from 'react';
import { Button } from 'components';
import { useStyles } from './AllAcountsAndCardsScreen.styles';
import { Plus } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

const LeftIcon = () => <Plus color={Colors.white} />;

export const ListFooter = () => {
  const styles = useStyles();

  return (
    <Button.Primary
      fullWidth
      text="products.newAccount"
      customWrapperStyle={styles.button}
      leftIcon={LeftIcon}
    />
  );
};
