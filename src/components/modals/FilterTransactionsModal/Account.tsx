import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { useStyles } from './FilterTransactionsModal.styles';
import { AccountProps } from './FilterTransactionsModal.types';

export const Account: FC<AccountProps> = ({ isSelected, account, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable key={account.iban} onPress={onPress}>
      <View style={styles.account}>
        <View>
          <Text children={account.accountName} secondary />
          <Text children={account.iban} />
        </View>
        <View style={[styles.outline, isSelected && styles.selected]}>
          {isSelected && <View style={styles.inner} />}
        </View>
      </View>
      <Divider height={1} marginTop={18} marginBottom={18} />
    </Pressable>
  );
};
