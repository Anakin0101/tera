import { SvgProps } from 'react-native-svg';

export type ProfileCardType = {
  id: string;
  icon: (props: SvgProps) => React.JSX.Element;
  text: string;
  extraData?: React.JSX.Element;
  absolute?: boolean;
  pressFn?: () => void;
  navigateTo?:
    | {
        stack: any;
        screen: 'AtmsAndBranchesScreen'; // Add screen names of ProfileCards
      }
    | 'AtmsAndBranchesScreen'; // Add screen names of ProfileCards
};
