import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { CustomTextInput } from 'components/CustomInput/CustomInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EditSvg } from 'assets/SVGs';
import { transferProps } from './TransferToAccountScreen.types';
import { getCurrencyIcon } from 'utils/currency';

export const Transfer = ({
  onTextChange,
  inputRef,
  openTransferScreen,
  selectedData,
  accountFromData,
  fromOtherBanks,
}: transferProps) => {
  const styles = useStyleTheme();

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
          <Text children={selectedData ? selectedData : 'პირადი გადარიცხვა'} style={styles.text} />
          <EditSvg style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
          <Text children={selectedData ? selectedData : 'ნაშთის გადატანა'} style={styles.text} />
          <EditSvg style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
