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

export const TransferToBudget = () => {
  const navigateToTransferDetails = () => {};
  const openTransferScreen = () => {};
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
      <View>
        <Button.Primary
          text="onboarding.next"
          fullWidth
          disabled={isButtonDisabled}
          hitSlop={30}
          onPress={navigateToTransferDetails}
        />
      </View>
    </View>
  );
};
