import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type Position = 'left' | 'right' | 'center';

export type IconComponentProps = {
  position?: Position;
  hasBorder?: boolean;
};

export type TitleProps = {
  position?: Position;
  content: string;
};

export type CustomHeaderProps = {
  title: string;
  customHeaderContainerStyle?: ViewStyle;
};

export type IconProps = SvgProps & {
  onPress?: () => void;
};

export type CustomHeaderOptions = CustomHeaderProps;

export type ElementsType = IconComponentProps & {
  handler?: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  native?: boolean;
};
