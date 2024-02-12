import { SvgProps } from 'react-native-svg';

export type ProfileItemType = {
  index?: number;
  id: string;
  icon: (props: SvgProps) => React.JSX.Element;
  text: string;
  navigateTo?:
    | {
        stack: any;
        screen: 'AuthorizationMethodsScreen' | 'SettingsScreen';
      }
    | 'AuthorizationMethodsScreen'
    | 'SettingsScreen';
  handlePress?: () => void;
};
