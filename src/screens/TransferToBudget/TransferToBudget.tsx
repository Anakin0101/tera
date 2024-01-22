import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './TransferToBudget.styles';

import { Button } from 'components';

export const TransferToBudget = () => {
  const styles = useStyleTheme();

  //this screen is not finished
  return (
    <View style={styles.container}>
      <View>
        <Button.Primary
          text="onboarding.next"
          fullWidth
          //   disabled={isButtonDisabled}
          hitSlop={30}
          //   onPress={navigateToTransferDetails}
        />
      </View>
    </View>
  );
};
