import { TextInput } from 'react-native';

interface FormatAndValidateTextProps {
  text: string;
  decimalPlaces: number;
  inputRef: React.RefObject<TextInput>;
  template?: any;
}

export const formatAndValidateText = ({
  text,
  decimalPlaces,
  inputRef,
  template,
}: FormatAndValidateTextProps): { isInvalidInput: boolean; processedText: string } => {
  let processedText = text.replace(/,/g, '.').replace(/[^\d.]/g, '');

  const parts = processedText.split('.');

  if (parts.length > 1) {
    processedText = parts[0] + '.' + parts.slice(1).join('').substring(0, decimalPlaces);
  } else {
    // New validation: Prevent digits from being added after a standalone zero in the integer part
    processedText = parts[0].replace(/^0\d+/, '0');
  }

  if (inputRef?.current) {
    inputRef.current.setNativeProps({ text: processedText });
  }

  const isInvalidInput =
    template || !processedText || processedText.trim() === '' || parseFloat(processedText) === 0;
  return { isInvalidInput, processedText };
};
