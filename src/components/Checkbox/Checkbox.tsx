import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Checked, Unchecked } from 'assets/SVGs';
import { CheckboxProps } from './Checkbox.types';
import { useStyleTheme } from './Checkbox.styles';
import { Text } from '../index';

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  onChange,
  label,
  disabled,
  checkedColor,
  labelStyle,
  style,
}) => {
  const styles = useStyleTheme();
  const handleChange = () => {
    onChange?.(!isChecked);
  };

  return (
    <Pressable onPress={handleChange} disabled={disabled}>
      <View style={[styles.container, style]}>
        {isChecked ? <Checked color={checkedColor} /> : <Unchecked />}
        {label && <Text children={label} style={[styles.label, labelStyle]} />}
      </View>
    </Pressable>
  );
};
