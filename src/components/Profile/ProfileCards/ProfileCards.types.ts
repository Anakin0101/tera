import { SvgProps } from 'react-native-svg';

export type ProfileCardType = {
  id: string;
  icon: (props: SvgProps) => React.JSX.Element;
  text: string;
};
