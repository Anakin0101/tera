import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './ForeignIbanTransfer.styles';
import { CustomTextInput } from 'components/CustomInput/CustomInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EditSvg } from 'assets/SVGs';
import { getCurrencyIcon } from 'utils/currency';

export const ForeignIbanTransfer = ({
  onTextChange,
  inputRef,
  openTransferScreen,
  accountFromData,
}: any) => {
  const styles = useStyleTheme();

  return (
    <View style={styles.transferWrapper}>
      <Text children="transfers.amount" />
      <View style={styles.inputWrapper}>
        <Text
          children={getCurrencyIcon(accountFromData?.ccy)}
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
      <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
        <Text children={'transfers.balanceTansfer'} style={styles.text} />
        <EditSvg style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
