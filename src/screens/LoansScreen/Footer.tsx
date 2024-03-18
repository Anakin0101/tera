import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Button } from 'components';
import { Plus } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { useStyles } from './ LoansScreen.styles';
import { FooterProps } from './LoanScreen.types';

const LeftIcon = () => <Plus color={Colors.white} />;

export const Footer: FC<FooterProps> = memo(({ onPress }) => {
  const styles = useStyles();

  return (
    <View>
      <Button.Primary
        fullWidth
        text="loans.new"
        leftIcon={LeftIcon}
        onPress={onPress}
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
    </View>
  );
});
