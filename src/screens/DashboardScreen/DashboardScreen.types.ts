import { DashboardStackScreenProps } from 'navigation/types';
import { SharedValue } from 'react-native-reanimated';

export interface ITeraBankProps {
  scroll: SharedValue<number>;
}

export type DashboardScreenProps = {
  navigation: DashboardStackScreenProps<'DashboardScreen'>;
};
