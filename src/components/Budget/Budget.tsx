import React from 'react';
import { View } from 'react-native';
import { TextInput, Text, Button } from 'components/index';
import { useStyles } from './Budget.styles';
import { budgetProps } from './Budget.types';
import { openModal } from 'utils/modal';
import { CreateCodeModal } from 'components/modals';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';

export const Budget = ({
  budgetCode,
  onChangeBudgetCode,
  treasury,
  setClickedCreateCode,
}: budgetProps) => {
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { wrappedCode, treasuryFromCode } = selectedItemFromStore;

  const styles = useStyles();

  const createdWrappedCode = `${wrappedCode?.a ?? ''}${wrappedCode?.b ?? ''}${
    wrappedCode?.c ?? ''
  }`;

  const checkLength = createdWrappedCode.length > 0 || budgetCode.length > 0;
  return (
    <View style={styles.container}>
      <Text children="transactions.getBudgetCode" marginTop={32} style={styles.budgetTitle} />
      <TextInput
        label="transactions.budgetCode"
        value={budgetCode || (createdWrappedCode === null ? '' : createdWrappedCode)}
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
        onPress={() => {
          setClickedCreateCode(true);
          openModal({
            element: <CreateCodeModal />,
            title: 'transactions.createCode',
            titlePosition: 'center',
          });
        }}
      />
      {checkLength && (treasuryFromCode || treasury) ? (
        <View style={styles.budgetView}>
          <Text
            children={`${(treasury && treasury[0]?.id) ?? createdWrappedCode}  - `}
            style={styles.budgetData}
          />
          <Text
            children={`${(treasury && treasury[0]?.name) ?? treasuryFromCode[0]?.name}  `}
            style={styles.budgetData}
          />
        </View>
      ) : null}
    </View>
  );
};
