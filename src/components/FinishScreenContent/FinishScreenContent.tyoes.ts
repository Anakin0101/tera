import { TOptions } from 'i18next';
import { ReactElement } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type FinishScreenContentProps = {
  isSuccess?: boolean;
  title?: string;
  description?: string;
  ctaTEXT?: string;
  ctaHandler?: () => void;
  children?: ReactElement;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  titleTranslateProp?: TOptions;
  descriptionTranslateProp?: TOptions;
  iconSize?: number;
};
