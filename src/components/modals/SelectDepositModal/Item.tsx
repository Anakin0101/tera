import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { useStyles } from './SelectDepositModal.styles';
import { ItemProps } from './SelectDepositModal.types';

export const Item: FC<ItemProps> = ({ isSelected, account, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable key={account.accountId} onPress={onPress}>
      <View style={styles.account}>
        <View>
          <Text children={account.nameGeo} secondary />
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
