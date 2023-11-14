import { StyleSheet } from 'react-native';
import { useDefaultHeaderHeight, useTheme } from 'hooks';
import { DISTANCE_BETWEEN_TABS } from './DashboardTabBar';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, Colors, MetricsSizes } = useTheme();
  const { headerHeight } = useDefaultHeaderHeight();

  return StyleSheet.create({
    tabBarContainer: {
      ...Layout.row,
      ...Layout.absolute,
      gap: DISTANCE_BETWEEN_TABS,
      borderBottomWidth: 1,
      borderBottomColor: Colors.inputBlack50,
      height: MetricsSizes.regular,
      paddingHorizontal: Spacing.xl,
      width: config.mobileWidth,
      top: headerHeight,
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
    overlay: {
      ...Layout.absolute,
      height: MetricsSizes.regular,
      top: headerHeight,
      width: config.mobileWidth,
    },
  });
};
