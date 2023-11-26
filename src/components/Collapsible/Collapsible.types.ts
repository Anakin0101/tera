import { StyleProp, ViewStyle } from 'react-native';

export interface CollapsibleProps {
  renderHeader: React.ReactNode;
  renderContent: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
  headerHeight: number;
  contentHeight: number;
}
