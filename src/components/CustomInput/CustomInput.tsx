import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { customInputTypes } from './CustomInput.types';
import { useStyleTheme } from './CustomInput.styles';

export const CustomTextInput = ({
  focusOnMount,
  onTextChange,
  inputRef,
  placeholder,
  value = '',
  ...props
}: customInputTypes) => {
  const styles = useStyleTheme();
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleTextChange = (text: string) => {
    setText(text);
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
      value={text}
      keyboardType="numeric"
      onChangeText={handleTextChange}
      placeholder={placeholder}
      {...props}
      style={styles.input}
      selectionColor="rgba(159, 29, 107, 1)"
      textAlign="right"
      placeholderTextColor="#000"
      maxFontSizeMultiplier={1}
    />
  );
};
