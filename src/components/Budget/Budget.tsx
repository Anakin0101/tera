import React from 'react';
import { View } from 'react-native';
import { TextInput, Text, Button } from 'components/index';
import { useStyles } from './Budget.styles';
import { budgetProps } from './Budget.types';

export const Budget = ({ budgetCode, onChangeBudgetCode, treasury }: budgetProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text children="transactions.getBudgetCode" marginTop={32} style={styles.budgetTitle} />
      <TextInput
        label="transactions.budgetCode"
        value={budgetCode}
        onChangeText={onChangeBudgetCode}
        keyboardType="numeric"
        marginTop={32}
        autoFocus
      />
      <Button.Secondary
        fullWidth
        text="transactions.createCode"
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
      {treasury && (
        <View style={styles.budgetView}>
          <Text children={`${treasury[0]?.id} - `} style={styles.budgetData} />
          <Text children={treasury[0]?.name} style={styles.budgetData} />
        </View>
      )}
    </View>
  );
};
