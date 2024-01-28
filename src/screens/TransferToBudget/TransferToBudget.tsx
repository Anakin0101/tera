import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './TransferToBudget.styles';
import { Transfer } from 'screens/TransferToAccountScreen/Transfer';
import { Button } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SelectedItemProp } from 'screens/TransferDetailScreen/TransferDetailScreen.types';
import { formatAndValidateText } from 'utils/formatDecimalAndValidate';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedPrice } from 'store/slices/transfers';
import CardSwap from 'screens/TransferToAccountScreen/CardSwap';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { BUDGET_TRANSFER_DETAILS, PRIVATE_TRANSACTION_SCREEN } from 'navigation/ScreenNames';

export const TransferToBudget = () => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'BudgetTransferDetailsScreen'>>();
  const navigateToTransferDetails = () => {
    navigate(BUDGET_TRANSFER_DETAILS);
  };
  const openTransferScreen = () => {
    navigate(PRIVATE_TRANSACTION_SCREEN, {
      from: 'other',
    });
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );
  const { accountFromData, selectedData, accountToData } = selectedItemFromStore;
  const styles = useStyleTheme();
  const inputRef = useRef(null);

  const handleTextChange = (text: string) => {
    const { isInvalidInput, processedText } = formatAndValidateText({
      text: text,
      decimalPlaces: 2,
      inputRef: inputRef,
    });
    dispatch(setSelectedPrice(processedText));
    setIsButtonDisabled(isInvalidInput);
  };

  //this screen is not finished
  return (
    <View style={styles.container}>
      <Transfer
        accountFromData={accountFromData}
        selectedData={selectedData}
        onTextChange={handleTextChange}
        inputRef={inputRef}
        openTransferScreen={openTransferScreen}
      />
      <CardSwap accountFromData={accountFromData} accountToData={accountToData} fromBudget />
      <View style={styles.buttonsContainer}>
        <Button.Primary
          text="onboarding.next"
          fixedWidth
          disabled={isButtonDisabled}
          hitSlop={30}
          onPress={navigateToTransferDetails}
        />
      </View>
    </View>
  );
};
