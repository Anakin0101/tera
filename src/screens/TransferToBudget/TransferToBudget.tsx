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
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { useRoute } from '@react-navigation/native';
export const TransferToBudget = () => {
  const { isKeyboardOpened } = useKeyboard();
  const { params } = useRoute<any>();
  // const { params } = useRoute<TransactionsStackRouteProps<'BudgetTransferDetailsScreen'>>(); << didn't work as expected so I used any for now

  const createdWrappedCode = params.treasury
    ? `${params.treasury.a ?? ''}${params.treasury.b ?? ''}${params.treasury.c ?? ''}`
    : params.budgetCode;

  const { navigate } = useNavigation<TransactionsStackScreenProps<'BudgetTransferDetailsScreen'>>();
  const navigateToTransferDetails = () => {
    navigate(BUDGET_TRANSFER_DETAILS);
  };
  const openTransferScreen = () => {
    navigate(PRIVATE_TRANSACTION_SCREEN, {
      from: 'budget',
    });
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );
  const { accountFromData, accountToData } = selectedItemFromStore;
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
    <KeyboardAvoidingScrollView
      scrollEnabled={isKeyboardOpened}
      containerStyle={styles.keyboardContainer}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text="onboarding.next"
            fullWidth
            disabled={isButtonDisabled}
            hitSlop={15}
            onPress={navigateToTransferDetails}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <Transfer
          accountFromData={accountFromData}
          selectedData={createdWrappedCode}
          onTextChange={handleTextChange}
          inputRef={inputRef}
          openTransferScreen={openTransferScreen}
        />
        <CardSwap accountFromData={accountFromData} accountToData={accountToData} fromBudget />
      </View>
    </KeyboardAvoidingScrollView>
  );
};
