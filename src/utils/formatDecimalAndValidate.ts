import { TextInput } from 'react-native';

interface FormatAndValidateTextProps {
  text: string;
  decimalPlaces: number;
  inputRef: React.RefObject<TextInput>;
}

export const formatAndValidateText = ({
  text,
  decimalPlaces,
  inputRef,
}: FormatAndValidateTextProps): { isInvalidInput: boolean; processedText: string } => {
  let processedText = text.replace(/,/g, '.').replace(/[^\d.]/g, '');

  const parts = processedText.split('.');

  if (parts.length > 1) {
    processedText = parts[0] + '.' + parts.slice(1).join('').substring(0, decimalPlaces);
  }

  if (inputRef?.current) {
    inputRef.current.setNativeProps({ text: processedText });
  }

  const isInvalidInput =
    !processedText || processedText.trim() === '' || parseFloat(processedText) === 0;
  return { isInvalidInput, processedText };
};
