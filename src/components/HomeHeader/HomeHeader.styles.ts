import { useDefaultHeaderHeight, useTheme } from 'hooks';
import { StyleSheet } from 'react-native';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, FontSize, Colors } = useTheme();
  const { headerHeight } = useDefaultHeaderHeight();

  return StyleSheet.create({
    wrapper: {
      height: headerHeight,
    },
    container: {
      ...Layout.justifyContentEnd,
      ...Layout.absolute,
      height: headerHeight,
      width: config.mobileWidth,
    },
    innerContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      marginHorizontal: Spacing.xl,
    },
    iconContainer: {
      ...Layout.row,
      gap: Spacing.m,
      marginBottom: Spacing.m,
    },
    icon: {
      backgroundColor: 'transparent',
      margin: Spacing.zero,
    },
    text: {
      marginBottom: Spacing.ml,
      fontSize: FontSize.large,
      lineHeight: 28,
    },
    overlay: {
      ...Layout.absolute,
      height: headerHeight,
      width: config.mobileWidth,
    },
    badge: {
      ...Layout.center,
      ...Layout.absolute,
      height: Spacing.l,
      width: Spacing.l,
      borderRadius: Spacing.l / 2,
      backgroundColor: Colors.primary,
      right: -5,
      top: -5,
    },
    badgeLabel: {
      color: Colors.white,
      fontSize: FontSize.tiny,
      lineHeight: 17,
    },
  });
};
