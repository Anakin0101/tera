import {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
  Animated,
  ImageSourcePropType,
  ImageResizeMode,
} from 'react-native';

export interface IItem {
  image: ImageSourcePropType;
  title?: string;
  desc?: string;
}

export interface CarouselProps {
  data: IItem[];
  gap?: number;
  delay?: number;
  skipable?: boolean;
  withTimer?: boolean;
  resizeMode?: ImageResizeMode;
  renderItem?: React.ReactNode;
  dotStyle?: StyleProp<ViewStyle>;
  descStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  skipButtonContainerStyle?: StyleProp<ViewStyle>;
  onSkip?: () => void;
  onTimeout?: () => void;
}
export interface IndicatorProps {
  data: IItem[];
  gap?: number;
  activeIndex: number;
  translateX: Animated.Value;
  dotStyle?: StyleProp<ViewStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
}
