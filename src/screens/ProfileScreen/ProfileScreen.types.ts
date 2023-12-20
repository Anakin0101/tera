import { ModalStackParamsList } from 'navigation/types';
import { SvgProps } from 'react-native-svg';

export type ProfileItemType = {
  index?: number;
  id: string;
  icon: (props: SvgProps) => React.JSX.Element;
  text: string;
  navigateTo?:
    | {
        stack: any;
        screen: keyof ModalStackParamsList;
      }
    | keyof ModalStackParamsList;
  handlePress?: () => void;
};
