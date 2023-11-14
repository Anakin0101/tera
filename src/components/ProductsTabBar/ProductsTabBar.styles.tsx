import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { DISTANCE_BETWEEN_TABS } from './ProductsTabBar';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, Colors, MetricsSizes } = useTheme();

  return StyleSheet.create({
    tabBarContainer: {
      ...Layout.row,
      gap: DISTANCE_BETWEEN_TABS,
      borderBottomWidth: 1,
      borderBottomColor: Colors.inputBlack50,
      height: MetricsSizes.regular,
      paddingHorizontal: Spacing.xl,
      width: config.mobileWidth,
    },
    indicator: {
      ...Layout.absolute,
      bottom: Spacing.zero,
      left: Spacing.zero,
      borderTopLeftRadius: Spacing.xxxs,
      borderTopRightRadius: Spacing.xxxs,
      backgroundColor: Colors.primary,
      height: 3,
    },
  });
};
