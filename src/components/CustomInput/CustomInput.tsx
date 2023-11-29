import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { customInputTypes } from './CustomInput.types';
export const CustomTextInput = ({
  focusOnMount,
  onTextChange,
  inputRef,
  placeholder,
  ...props
}: customInputTypes) => {
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
      style={{
        fontSize: 50,
        borderWidth: 0,
        padding: 10,
        color: 'black',
      }}
      selectionColor="rgba(159, 29, 107, 1)"
      textAlign="right"
      placeholderTextColor="#000"
    />
  );
};
