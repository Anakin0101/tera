import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { CustomTextInput } from 'components/CustomInput/CustomInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EditSvg } from 'assets/SVGs';
import { transferProps } from './TransferToAccountScreen.types';
export const Transfer = ({
  onTextChange,
  inputRef,
  openTransferScreen,
  selectedData,
  selectedItem,
}: transferProps) => {
  const styles = useStyleTheme();
  return (
    <View style={styles.transferWrapper}>
      <Text children="transfers.amount" />
      <CustomTextInput
        inputRef={inputRef}
        placeholder="$00.00"
        onTextChange={onTextChange}
        focusOnMount={true}
      />
      <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
        <Text children={!selectedData ? selectedItem.name : selectedData} style={styles.text} />
        <EditSvg style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
