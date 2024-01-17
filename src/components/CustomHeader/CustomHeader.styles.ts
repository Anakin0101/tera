import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { useDefaultHeaderHeight } from 'hooks/useDefaultHeaderHeight';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout, Colors } = useTheme();
  const { headerHeight } = useDefaultHeaderHeight();

  return StyleSheet.create({
    wrapper: {
      height: headerHeight,
      ...Layout.justifyContentEnd,
    },
    container: {
      height: headerHeight,
      ...Layout.row,
      ...Layout.alignItemsEnd,
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
    badge: {
      ...Layout.center,
      ...Layout.absolute,
      height: Spacing.l,
      width: Spacing.l,
      borderRadius: Spacing.l / 2,
      backgroundColor: Colors.primary,
      right: -5,
      top: 7,
    },
    badgeLabel: {
      color: Colors.white,
      fontSize: FontSize.tiny,
      lineHeight: 17,
    },
  });
};
