import { StyleSheet } from 'react-native';
import { useDefaultHeaderHeight, useTheme } from 'hooks';
import { DISTANCE_BETWEEN_TABS } from './OtherBanksTransactionTabBar';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, MetricsSizes } = useTheme();
  const { headerHeight } = useDefaultHeaderHeight();

  return StyleSheet.create({
    tabBarContainer: {
      ...Layout.row,
      ...Layout.absolute,
      justifyContent: 'center',
      gap: DISTANCE_BETWEEN_TABS,
      height: MetricsSizes.regular,
      paddingHorizontal: Spacing.xl,
      width: config.mobileWidth,
      top: headerHeight,
    },
    otherBanksContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentAround,
      height: MetricsSizes.regular,
      paddingHorizontal: 10,
      width: '100%',
      marginTop: 30,
    },

    overlay: {
      height: MetricsSizes.regular,
      top: headerHeight,
      width: config.mobileWidth,
    },
  });
};
