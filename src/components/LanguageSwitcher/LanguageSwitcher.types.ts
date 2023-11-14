import { SvgProps } from 'react-native-svg';

export const LanguageKeys = {
  en: 'en',
  geo: 'geo',
};
export type Lang = keyof typeof LanguageKeys;

export type CurrentLanguageState = {
  label: string;
  icon: (props: SvgProps) => React.JSX.Element;
};
