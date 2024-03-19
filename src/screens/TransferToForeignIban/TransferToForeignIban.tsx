import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './TransferToForeignIban.styles';
import { TinyChevron } from 'assets/SVGs';
import { Button } from 'components';
import { ForeignCardItem } from './ForeignCardItem';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ForeignIbanTransfer } from 'components/ForeignIbanTransfer/ForeignIbanTransfer';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { formatMoney } from 'utils/formatMoney';
import { formatAndValidateText } from 'utils/formatDecimalAndValidate';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedPrice } from 'store/slices/transfers';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { FOREIGN_TRANSFER_DETAILS_SCREEN } from 'navigation/ScreenNames';

const initialState = {
  accountFromData: {
    ccy: '',
    availableBalance: 0,
    accountName: '',
  },
};

export const TransferToForeignIban = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ModalStackScreenProps<'TransferDetailScreen'>>();
  const transfers = useAppSelector(state => state?.transfers);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { isKeyboardOpened } = useKeyboard();
  const styles = useStyleTheme();
  const { receiverIban, receiverName, ccy } = transfers.foreignIbanData;

  const {
    ccy: senderCcy,
    availableBalance,
    accountName,
  } = transfers.accountFromData ?? initialState.accountFromData;
  const inputRef = useRef(null);

  const openTransferScreen = () => {
    navigate(FOREIGN_TRANSFER_DETAILS_SCREEN);
  };

  const handleTextChange = (text: string) => {
    const { isInvalidInput, processedText } = formatAndValidateText({
      text: text,
      decimalPlaces: 2,
      inputRef: inputRef,
    });
    dispatch(setSelectedPrice(processedText));
    setIsButtonDisabled(isInvalidInput);
  };
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
            onPress={openTransferScreen}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <ForeignIbanTransfer
          accountFromData={transfers.foreignIbanData}
          onTextChange={handleTextChange}
          inputRef={inputRef}
          openTransferScreen={openTransferScreen}
        />
        <View style={styles.cardWrapper}>
          <ForeignCardItem
            title={accountName}
            balance={formatMoney(availableBalance)}
            ccy={senderCcy}
          />
          <TinyChevron style={styles.chevronIcon} />
          <ForeignCardItem reverse title={receiverName} balance={receiverIban} ccy={ccy} />
        </View>
      </View>
    </KeyboardAvoidingScrollView>
  );
};
