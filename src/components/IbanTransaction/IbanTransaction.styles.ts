import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing, MetricsSizes } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.headerBackground,
      width: config.mobileWidth,
    },
    scroll: {
      width: config.mobileWidth,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
      height: '100%',
    },
    inputStyle: { width: horizontalScale(250) },
    sectionListContent: {
      ...Layout.overflowHidden,
      paddingBottom: 70,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      backgroundColor: Colors.white,
    },
    template: {
      paddingVertical: Spacing.lg,
    },
    wrapper: {
      ...Layout.absolute,
      right: 0,
      top: MetricsSizes.small,
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
    },
    btn: { marginVertical: Spacing.xlm },
    image: { width: 40, height: 40 },
    chevron: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.l,
    },
    fastPayment: {
      backgroundColor: Colors.error100,
      borderRadius: Spacing.m,
      padding: Spacing.m,
      marginTop: Spacing.md,
    },
    bottomStretchStyle: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.ml,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    keyboardContainer: {
      ...Layout.fill,
    },
  });
};
