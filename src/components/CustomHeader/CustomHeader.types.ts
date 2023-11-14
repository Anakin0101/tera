import { StackHeaderProps } from '@react-navigation/stack';
import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type Position = 'left' | 'right' | 'center';

export type IconComponentProps = {
  position?: Position;
};

export type TitleProps = {
  position?: Position;
  content: string;
};

export type CustomHeaderProps = {
  isInitialScreen?: boolean;
  searchElement?: IconComponentProps;
  notificationsElement?: IconComponentProps;
  messagesElement?: IconComponentProps;
  backElement?: IconComponentProps;
  title?: string;
  titlePosition?: Position;
  accountTitle?: string;
  customHeaderContainerStyle?: ViewStyle;
  bottomBorder?: boolean;
};

export type IconProps = SvgProps & {
  onPress?: () => void;
};

export type CustomHeaderOptions = StackHeaderProps & CustomHeaderProps;

export type ElementsType = IconComponentProps & {
  handler?: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  native?: boolean;
};
