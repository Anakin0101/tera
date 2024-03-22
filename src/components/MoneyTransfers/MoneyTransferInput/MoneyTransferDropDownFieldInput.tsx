import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { useStyles } from './MoneyTransferDropDownFieldInput.styles';
import { ArrowDown } from 'assets/SVGs';
import { Divider } from 'components/Divider/Divider';
import { useMoneyTransferDropDown } from './container';
import { MoneyTransferDropDownFieldInputProps } from './MoneyTransferDropDownFieldInput.types';

export const MoneyTransferDropDownFieldInput: React.FC<MoneyTransferDropDownFieldInputProps> = memo(
  ({ name = '', selectedItem, onChangeText = () => {}, fieldItems = [] }) => {
    const styles = useStyles();

    const { changeFieldOnPress } = useMoneyTransferDropDown(
      name,
      fieldItems,
      selectedItem,
      onChangeText,
    );

    return (
      <Pressable onPress={changeFieldOnPress}>
        <View style={styles.container}>
          <View>
            <Text style={styles.headerTitle}>{name}</Text>
            <Text style={styles.valueStyle}>{selectedItem?.value}</Text>
          </View>
          <View>
            <ArrowDown width={24} height={14} />
          </View>
        </View>
        <Divider marginTop={8} />
      </Pressable>
    );
  },
);
