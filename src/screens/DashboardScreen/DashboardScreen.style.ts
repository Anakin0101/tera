import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { config } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors, FontSize, MetricsSizes } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fullSize,
      ...Layout.justifyContentStart,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xxl - Spacing.xxs,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      flex: 1,
    },
    containerFlex: { flex: 1 },
    cardContainer: {
      paddingVertical: Spacing.m,
      width: '100%',
      paddingHorizontal: Spacing.xl,
      // paddingTop: Spacing.xxl - Spacing.xxs,
      backgroundColor: Colors.white,
      marginBottom: Spacing.xxs,
    },
    cardContainerFull: {
      paddingVertical: Spacing.m,
      width: '100%',
      paddingLeft: Spacing.xl,
      // paddingTop: Spacing.xxl - Spacing.xxs,
      backgroundColor: Colors.white,
      marginBottom: Spacing.xxs,
    },
    wrapper: {
      ...Layout.fill,
    },
    sectionList: {
      ...Layout.overflowHidden,
      width: config.mobileWidth,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
    },
    sectionListContent: {
      flexGrow: 1,
      ...Layout.overflowHidden,
      width: config.mobileWidth,
      paddingBottom: 230,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
    },
    LoaderContenr: {
      width: config.mobileWidth,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
    },
    loader: { marginTop: 30, backgroundColor: Colors.skeleton, width: '100%' },
    item: {
      padding: Spacing.lg,
      marginVertical: Spacing.s,
    },
    header: {
      fontSize: FontSize.extraLarge,
      backgroundColor: Colors.white,
    },
    otherBanksWrapper: {
      width: config.mobileWidth,
      marginTop: MetricsSizes.regular,
      padding: Spacing.xl,
    },
  });
};
