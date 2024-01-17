import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { CustomTextInput } from 'components/CustomInput/CustomInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EditSvg } from 'assets/SVGs';
import { TransferProps } from './TransferToAccountScreen.types';
import { getCurrencyIcon } from 'utils/currency';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedOtherBankDataTitle } from 'store/slices/transfers';
export const Transfer = ({
  onTextChange,
  inputRef,
  openTransferScreen,
  selectedData,
  accountFromData,
  fromOtherBanks,
  transactionTitle,
}: TransferProps) => {
  const styles = useStyleTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedOtherBankDataTitle(transactionTitle));
  }, [dispatch, transactionTitle]);

  return (
    <View style={styles.transferWrapper}>
      <Text children="transfers.amount" />
      <View style={styles.inputWrapper}>
        <Text
          children={getCurrencyIcon(accountFromData.ccy)}
          style={styles.inputText}
          size={50}
          withoutLineHeight={true}
        />

        <CustomTextInput
          inputRef={inputRef}
          placeholder="00.00"
          onTextChange={onTextChange}
          focusOnMount={true}
        />
      </View>
      {fromOtherBanks ? (
        <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
          <Text children={selectedData ? selectedData : transactionTitle} style={styles.text} />
          <EditSvg style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
          <Text
            children={selectedData ? selectedData : 'transfers.balanceTansfer'}
            style={styles.text}
          />
          <EditSvg style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
