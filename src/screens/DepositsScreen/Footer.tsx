import React, { FC, memo } from 'react';
import { Button } from 'components';
import { Plus } from 'assets/SVGs';
import { useStyles } from './DepositsScreen.styles';
import { FooterProps } from './DepositScreen.types';
import { Colors } from 'theme/Variables';

const LeftIcon = () => <Plus color={Colors.white} />;

export const ListFooter: FC<FooterProps> = memo(({ onPress }) => {
  const styles = useStyles();

  return (
    <Button.Primary
      fullWidth
      text="products.newDeposit"
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
      leftIcon={LeftIcon}
      onPress={onPress}
    />
  );
});
