import { SvgProps } from 'react-native-svg';

export const LanguageKeys = {
  en: 'en',
  geo: 'geo',
};

export enum LanguageKeyForAPIEnum {
  KA = 'ka',
  EN = 'en',
}

export type Lang = keyof typeof LanguageKeys;

export type CurrentLanguageState = {
  label: string;
  icon: (props: SvgProps) => React.JSX.Element;
};
