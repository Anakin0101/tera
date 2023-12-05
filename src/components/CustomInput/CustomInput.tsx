import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { customInputTypes } from './CustomInput.types';
import { useStyleTheme } from './CustomInput.styles';
export const CustomTextInput = ({
  focusOnMount,
  onTextChange,
  inputRef,
  placeholder,
  ...props
}: customInputTypes) => {
  const styles = useStyleTheme();
  const [, setTextInput] = useState('');

  const handleTextChange = (text: string) => {
    setTextInput(text);
    onTextChange(text);
  };

  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnMount, inputRef]);

  return (
    <TextInput
      ref={inputRef}
      keyboardType="numeric"
      onChangeText={handleTextChange}
      placeholder={placeholder}
      {...props}
      style={styles.input}
      selectionColor="rgba(159, 29, 107, 1)"
      textAlign="right"
      placeholderTextColor="#000"
    />
  );
};
