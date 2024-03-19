import { StyleProp, ViewStyle } from 'react-native';

export interface routeItem {
  key: string;
  title: string;
}

export interface TabBarComponentProps {
  style?: StyleProp<ViewStyle>;
  routes: Array<routeItem>;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  tabIndex: number;
  routerIndex?: number;
}
