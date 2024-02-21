import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.headerBackground,
      width: config.mobileWidth,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    keyboardContainer: {
      ...Layout.fill,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    scroll: {
      width: config.mobileWidth,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
      height: '100%',
    },
    inputView: { paddingVertical: 20 },
    inputStyle: { width: horizontalScale(250) },
    sectionListContent: {
      ...Layout.overflowHidden,
      paddingBottom: 70,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      backgroundColor: Colors.white,
    },
    template: { paddingVertical: Spacing.lg },
    accountIban: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      height: 50,
      marginTop: 2,
      borderBottomWidth: 1,
      paddingVertical: 5,
      borderBottomColor: Colors.inputBlack50,
    },
    accountsCard: { marginTop: Spacing.md },
    receiver: { paddingVertical: Spacing.md },
    image: { width: 40, height: 40 },
  });
};
