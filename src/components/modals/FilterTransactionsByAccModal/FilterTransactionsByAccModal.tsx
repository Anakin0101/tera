import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useFilterTransactionsByAcc } from './container';
import { useStyles } from './FilterTransactionsByAccModal.styles';

export const FilterTransactionsByAccModal = () => {
  const styles = useStyles();
  const { groupedAccountsByIban, isLoadingAccounts, iban, handlePress } =
    useFilterTransactionsByAcc();

  if (isLoadingAccounts) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Divider height={1} marginTop={16} marginBottom={18} />
      {groupedAccountsByIban?.map(acc => (
        <Pressable key={acc.iban} onPress={() => handlePress(acc.iban)}>
          <View style={styles.account}>
            <View>
              <Text children={acc.accountName} color={Colors.textBlack500} />
              <Text children={acc.iban} />
            </View>
            <View style={[styles.outline, iban === acc.iban && styles.selected]}>
              {iban === acc.iban && <View style={styles.inner} />}
            </View>
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} />
        </Pressable>
      ))}
      <View style={styles.buttonsContainer}>
        <Button.Secondary
          text="common.clear"
          customWrapperStyle={styles.buttonWrapper}
          customTextStyle={styles.buttonLabel}
          onPress={() => {}}
        />
        <Button.Primary
          text="common.select"
          onPress={() => {}}
          customWrapperStyle={styles.buttonWrapper}
          customTextStyle={styles.buttonLabel}
        />
      </View>
    </View>
  );
};
