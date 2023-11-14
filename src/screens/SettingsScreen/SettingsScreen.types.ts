import { ProfileStackParamsList } from 'navigation/types';
import { SvgProps } from 'react-native-svg';

export type SubContentProps = {
  navigateTo: keyof ProfileStackParamsList;
  title: string;
  icon: (props: SvgProps) => React.JSX.Element;
};

export type SettingsConfigType = {
  title: string;
  subContent: SubContentProps[];
};
