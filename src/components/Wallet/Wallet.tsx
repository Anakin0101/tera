import React, { FC } from 'react';
import { WalletProps } from './Wallet.types';
import { Pressable, View } from 'react-native';
import { useStyles } from './Wallet.styles';
import { Text } from 'components';
import { WalletSvg } from 'assets/SVGs';
import { useTheme } from 'hooks';

export const Wallet: FC<WalletProps> = () => {
  const { Colors } = useTheme();
  const styles = useStyles();

  return (
    <>
      <View style={styles.wallettWrapper}>
        <Pressable style={styles.wallet}>
          <WalletSvg />
          <Text
            regular
            children="Add to Apple Wallet"
            size={18}
            color={Colors.white}
            style={styles.text}
          />
        </Pressable>
      </View>
    </>
  );
};
