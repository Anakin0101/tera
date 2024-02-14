import { useTheme } from 'hooks';
import { StyleSheet } from 'react-native';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    wrapper: {
      ...Layout.justifyContentEnd,
    },
    container: {
      ...Layout.justifyContentEnd,
      width: config.mobileWidth,
      paddingTop: Spacing.s,
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
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      display: 'none',
      backgroundColor: Colors.overlay,
    },
  });
};
