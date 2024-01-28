import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './Budget.styles';
import { budgetReceiverProps } from './Budget.types';

export const BudgetReceiver: FC<budgetReceiverProps> = ({ isSelected, account, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={styles.account}>
        <View style={[styles.outline, isSelected && styles.selected]}>
          {isSelected && <View style={styles.inner} />}
        </View>
        <View>
          <Text children={account.name} secondary style={styles.accountName} />
        </View>
      </View>
    </Pressable>
  );
};
